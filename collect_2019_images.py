import json, os, re, requests
from PIL import Image
# data = []
# with open('2019_performer_data.json', 'r', encoding='utf-8') as f:
#     data = json.load(f)
#     # print(data)
# print(data)

def get_image_list(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        image_list = [[d['image_100'], d['image_400']] for d in data]
        image_list = [item for sublist in image_list for item in sublist]
    return image_list

def copy_modify_performance_json(file,new_file,folder):
    data = []
    # Open the original JSON
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # point the image references to the new images
    for item in data:
        item['image_400'] = '/'+folder+'/'+ re.search(r"([^\/]+$)",item['image_400']).group()
        item['image_100'] = '/'+folder+'/'+ re.search(r"([^\/]+$)",item['image_100']).group()
    
    # Save the modified JSON
    with open(new_file, 'w', encoding='utf-8') as f:
        json.dump(data, f)


def save_image_to_disk(url,folder):
    try:
        response = requests.get(url, stream=True)
        image_name = re.search(r"([^\/]+$)",url).group()
        img = Image.open(response.raw)
        img.save(os.path.join(folder, image_name), "JPEG")
        img.save(image_name, "JPEG")
        if (os.path.isfile(image_name)):
            # print(f'removing {image_name}')
            os.remove(image_name)
        
        return 1
    except Exception as e:
        print(e)
        return 0

def process_image_list(image_list, folder):
    successful_downloads = 0
    count = 0
    for image in image_list:
        successful_downloads += save_image_to_disk(image,folder)
        count += 1
        print(f'{successful_downloads} -- {count}/{len(image_list)}')

if __name__ == '__main__':

    # These functions grab data from the json
    # performer_image_list = get_image_list('2019_performer_data_original.json')
    # workshop_image_list = get_image_list('2019_workshop_data_original.json')

    # Then copy photos into
    # process_image_list(performer_image_list, '2019')
    # process_image_list(workshop_image_list, '2019')

    # The following functions clone the performance JSONs
    # and tweak the image information to point to the new image location
    copy_modify_performance_json('2019_performer_data_original.json', '2019_performer_data.json', '2019')
    copy_modify_performance_json('2019_workshop_data_original.json', '2019_workshop_data.json', '2019')