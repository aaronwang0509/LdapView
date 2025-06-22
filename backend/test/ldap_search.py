from ldap3 import Server, Connection, ALL

# ==== Fill in your connection info ====
LDAP_HOST = 'tds.example.com'
LDAP_PORT = 1636  # use 389 if not SSL
USE_SSL = True
BIND_DN = 'uid=admin'
PASSWORD = 'password'
BASE_DN = 'dc=example,dc=com'
FILTER = '(uid=abarnes)'
ATTRIBUTES = ['*']  # or specify: ['cn', 'mail', 'uid']
# ======================================

server = Server(LDAP_HOST, port=LDAP_PORT, use_ssl=USE_SSL, get_info=ALL)
conn = Connection(server, user=BIND_DN, password=PASSWORD, auto_bind=True)

if conn.search(search_base=BASE_DN, search_filter=FILTER, attributes=ATTRIBUTES):
    for entry in conn.entries:
        print("DN:", entry.entry_dn)
        print("Attributes:", entry.entry_attributes_as_dict)
        print("-" * 50)
else:
    print("No entries found")

print(conn.entries)

conn.unbind()