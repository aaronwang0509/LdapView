import logging

# Configure root logger
logger = logging.getLogger("saas-ldap")
logger.setLevel(logging.INFO)

# Console handler
console_handler = logging.StreamHandler()
formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)

logger.addHandler(console_handler)
