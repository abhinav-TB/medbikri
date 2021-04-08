from bs4 import BeautifulSoup
import requests
import csv

file = open('fitness_price.csv' , 'w')
writer = csv.writer(file)
writer.writerow(['Item Name' , 'Company' , 'Price'])
pg_no = 1
while(True):
    print(f"scraping page : {pg_no} ")
    url = f"https://www.netmeds.com/non-prescriptions/fitness/page/{pg_no}"
    page = requests.get(url)
    soup = BeautifulSoup(page.text , 'html.parser')

    main_div = soup.find_all("div", class_="row product-list")[0] 

    items = main_div.find_all("div" , class_ = "cat-item")
    if len(items) is 0: break
    
    for item in items: 
        price = item.find("span" , id = "final_price").contents[0]
        company = item.find("span" , class_ = "drug-varients").contents[0].replace("Mfr: " , "")
        name = item.a['title']
        writer.writerow([name ,company , price])
    
    pg_no = pg_no + 1

file.close()
    # print(soup.find_all("div", class_="cat-item")[0])