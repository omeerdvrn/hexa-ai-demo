import os
from datetime import datetime, timezone
from firebase_functions import firestore_fn, scheduler_fn, options, https_fn
from typing import Dict, Any
from firebase_admin import initialize_app, firestore
from dotenv import load_dotenv
from services import JobService

load_dotenv()

DEPLOYMENT_REGION = os.getenv("DEPLOYMENT_REGION")

def get_firestore_client():
    try:
        initialize_app()
    except ValueError:
        pass
    return firestore.client()

@firestore_fn.on_document_created(
    document="jobs/{job_id}",
    region="europe-west1"
)
def process_job(event: firestore_fn.Event[firestore_fn.DocumentSnapshot]) -> None:
    db = get_firestore_client()
    job_service = JobService(db)
    
    try:
        job_data = event.data.to_dict()
        job_id = event.params.get("job_id")
        
        if not job_data:
            return
        
        result = job_service.process_job(job_id, job_data)
        
        job_service.update_job_status(job_id, result)
        
    except Exception:
        pass

