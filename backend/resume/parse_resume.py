import PyPDF2
import os
import spacy
import re
import json
import pandas as pd
import nltk
from pdfminer.high_level import extract_text
from nltk.corpus import stopwords
from datetime import date
from spacy.matcher import Matcher
from .models import ResumeData

# loading pre trained model
model = spacy.load('en_core_web_sm')
matcher = Matcher(model.vocab)
nltk.download('stopwords')


def get_name(resume):
    rtext = model(resume)
    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]
    matcher.add('NAME', [pattern])
    matches = matcher(rtext)

    for match_id, start, end in matches:
        span = rtext[start:end]
        return span.text
    return ""

def get_mobno(resume):
    pattern = r"\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"
    match = re.search(pattern, resume)
    if match:
        number = match.group()
        if len(number) > 10:
            return '+' + number
        else:
            return number

    return ""

# email
def get_mail(resume):
    email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", resume)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return None

# education
EDUCATION = ['Education', 'Academic', 'Educational',
             'Qualifications', 'Scholastic', 'Degree', 'Degrees', 'School']
STOPWORDS = set(stopwords.words('english'))
DEGREE = [
    'BE', 'B.E.', 'B.E', 'BS', 'B.S', 'B.Sc', 'BSc',
    'ME', 'M.E', 'M.E.', 'MS', 'M.S', 'M.Sc', 'MSc',
    'BTECH', 'B.TECH', 'M.TECH', 'MTECH',
    'BA', 'B.A', 'MA', 'M.A',
    'SSC', 'HSC', 'CBSE', 'ICSE', 'AISSCE', 'AISSE', 'BACHELOR', 'BACHELORS'
]

UNI_KEYWORDS = ['school', 'university', 'college', 'institute', 'technology',
                'school,', 'university,', 'college,', 'institute,', 'technology,']


def get_education(data):
    text_split = [i.strip() for i in data.split('\n')]

    # Finding education header
    idx = 0
    for i, x in enumerate(text_split):
        for ptr in EDUCATION:
            if re.search(ptr, x):
                idx = i
                break
        if idx != 0:
            break
    txt = "\n".join(text_split[idx:])

    # Searching for degrees
    nlp_text = model(txt)
    nlp_text = [sent.text.strip() for sent in nlp_text.sents]
    deg = []
    for index, text in enumerate(nlp_text):
        for tex in text.split():
            # Replace all special symbols
            tex = re.sub(r'[?|$|.|!|,]', r'', tex)
            if tex.upper() in DEGREE and tex not in STOPWORDS:
                deg.append(tex)

    # Searching for year of joining
    pattern = r'[0-9]{4}'
    lst = re.findall(pattern, txt)
    current_date = date.today()
    current_year = current_date.year
    yrs = []
    for i in lst:
        year = int(i)
        if 1900 <= year <= (current_year + 10):
            yrs.append(int(i))

    # Searching for institute name
    school_names = []
    for phrase in text_split[idx:]:
        p_key = set(phrase.lower().split(' ')) & set(UNI_KEYWORDS)
        if (len(p_key) == 0 or phrase.lower() in UNI_KEYWORDS):
            continue
        school_names.append(phrase)

    # Searching for percentage / GPA
    pattern = r'((?:\d{1,2}(?:\.\d{1,2})?|100)(?:\s*%|\/\d+))'
    gpa = re.findall(pattern, txt)

    # Filtering out
    l = min(len(deg), len(school_names))
    edu = []
    for i in range(l):
        edu.append(
            {"degree": deg[i], "institute": school_names[i], "year": 0, "gpa": ""})
    for i in range(min(l, len(yrs))):
        edu[i]["year"] = yrs[i]
    for i in range(min(l, len(gpa))):
        edu[i]["gpa"] = gpa[i]

    return edu


def extract_skills(resume_text):
    nlp_text = model(resume_text)
    noun_chunks = nlp_text.noun_chunks
    # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]

    # reading the csv file
    data = pd.read_csv(
        "D:/IIT Kanpur/github/resumate/resumate/files/codes/skills.csv")

    # extract values
    skills = list(data.skill_name.values)
    skillset = []

    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)

    # check for bi-grams and tri-grams (example: machine learning)
    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)

    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def get_links(FILEPATH):
    PDFFile = open(FILEPATH, 'rb')
    PDF = PyPDF2.PdfReader(PDFFile)
    pages = len(PDF.pages)
    key = '/Annots'
    uri = '/URI'
    ank = '/A'

    links = []
    for page in range(pages):
        print("Current Page: {}".format(page))
        pageSliced = PDF.pages[page]
        pageObject = pageSliced.get_object()
        if key in pageObject.keys():
            ann = pageObject[key]
            for a in ann:
                u = a.get_object()
                if uri in u[ank].keys():
                    links.append(u[ank][uri])

    return links


def get_linkedin(path):
    p = re.compile('(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)')
    links = get_links(path)
    for link in links:
        if p.match(link):
            return link

    return ""


def get_github(path):
    p = re.compile(
        '(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$')
    links = get_links(path)
    for link in links:
        if p.match(link):
            return link

    return ""


def parse_resume(filename, FILEPATH):
    data = extract_text(FILEPATH)
    name = get_name(data)
    email = get_mail(data)
    phno = get_mobno(data)
    skills = extract_skills(data)
    edu = get_education(data)
    linkedin = get_linkedin(FILEPATH)
    github = get_github(FILEPATH)

    resume_data = {
        "name": name,
        "email": email,
        "mobile_no": phno,
        "linkedin-profile": linkedin,
        "github": github,
        "education": edu,
        "skills": skills
    }
    json_data = json.dumps(resume_data)
    userdata = ResumeData(uuid=filename, data=json_data)
    userdata.save()

    return