import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <DefaultLayout title="Homepage | ResuMate" content="">
      <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#4a4a4a', marginBottom: '1rem' }}>
            Welcome to ResuMate
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            Streamline your hiring process with automated resume parsing and analytics.
          </p>
        </div>

        {/* Call to Action Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '-1rem', marginBottom: '1rem', width: '100%', maxWidth: '800px' }}>
          {/* Candidate Section */}
          <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '0.375rem', padding: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
              For Candidates
            </h2>
            <a
              href="/login"
              style={{
                display: 'inline-block',
                backgroundColor: '#3b82f6',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontSize: '1.125rem',
                fontWeight: '500',
                textDecoration: 'none',
              }}
            >
              Upload Resume
            </a>
          </div>

          {/* Recruiter Section */}
          <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '0.375rem', padding: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
              For Recruiters
            </h2>
            <a
              href="/adminlogin"
              style={{
                display: 'inline-block',
                backgroundColor: '#4b5563',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontSize: '1.125rem',
                fontWeight: '500',
                textDecoration: 'none',
              }}
            >
              Recruiter Login
            </a>
          </div>
        </div>

        {/* Feature Section */}
        <div style={{ marginTop: '2.5rem', textAlign: 'left', width: '100%', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
            Why Choose Resumate?
          </h2>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li style={{ color: '#4b5563', display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold', marginRight: '0.5rem' }}>✓</span>
              Automated Resume Parsing
            </li>
            <li style={{ color: '#4b5563', display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold', marginRight: '0.5rem' }}>✓</span>
              Detailed Analytics for Recruiters
            </li>
            <li style={{ color: '#4b5563', display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold', marginRight: '0.5rem' }}>✓</span>
              Secure and Confidential Processing
            </li>
          </ul>
        </div>
      </div>
    </DefaultLayout>
  );
}
