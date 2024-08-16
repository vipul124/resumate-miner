import os
import multiprocessing

bind = "0.0.0.0:8000"  # Replace with your desired host and port

# Number of Gunicorn worker processes
# For a server with 2 cores, it's generally recommended to use 2 * number of cores + 1 workers
workers = 3  # 2 cores * 2 + 1

# Worker concurrency
threads = 2  # You can experiment with this value based on your application's requirements

# Gunicorn log settings
accesslog = f"{os.getenv("BASE_FOLDER")}/backend/access.log"  # Set custom path for access log
errorlog = f"{os.getenv("BASE_FOLDER")}/backend/error.log"    # Set custom path for error log
loglevel = "info"

# Set Gunicorn process name
proc_name = "resumate"

# Maximum number of requests a worker will process before restarting
max_requests = 1000
max_requests_jitter = 100

# Automatically respawn workers if they exit prematurely
preload_app = True
