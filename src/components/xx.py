import clip
import torch
import requests
from PIL import Image
from io import BytesIO
import ipyplot
from os import listdir

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)


def loadImages(path):
    # return array of images

    imagesList = listdir(path)
    loadedImages = []
    for image in imagesList:
        img = Image.open(path + image)
        imgWidth, imgHeight = img.size
        newSize = (imgWidth, imgHeight)
        if imgHeight * imgWidth > 5953600:
            newSize = (imgWidth//2, imgHeight//2)
        
        resizedImg = img.resize(newSize)
        loadedImages.append(resizedImg)

    return loadedImages

path = '/home/raven/hot_storage/phx/DCIM/5AM/'
# your images in an array
all_images = loadImages(path)
print(str(len(all_images)) + ' images loaded')
print('ready')


input_images = [preprocess(im) for im in all_images]

with torch.no_grad():
  image_embeddings = model.encode_image(torch.stack(input_images))


query = 'humans'
query_tokens = clip.tokenize([query]) # Tokenize the Text with CLIP

with torch.no_grad():
  query_embeddings = model.encode_text(query_tokens)

def calculate_similarity(query_embeddings, input_embeddings):
  similariries = query_embeddings @ input_embeddings.T
  return similariries

sim = calculate_similarity(query_embeddings, image_embeddings)

sim_dict= dict(zip(range(len(sim[0])), sim[0]))  # Use Dictionary to Sort the Results
sorted_sim = sorted(sim_dict.items(),key=lambda x:x[1],reverse=True)
top_sim = sorted_sim[:3]  # Get top 3 results

for i in top_sim:
  print(str(len(top_sim)) + ' got our top 3')