bind = '0.0.0.0:9010'
workers = 1
worker_class = 'sync'
timeout = 30
max_requests = 3
accesslog = 'gunicorn.log'
errorlog = 'gunicorn.log'