
print("FILE IS RUNNING")
from flask import Flask, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

QUESTIONS = [
    {"question": "Is the Sun a star", "correct_answer": True, "category": "Science", "difficulty": "Easy", "explanation": "The Sun is a star at the center of the solar system."},
    {"question": "Does sound travel in a vacuum?", "correct_answer": False, "category": "Physics", "difficulty": "Easy", "explanation": "Sound requires a medium like air or water to travel."},
    {"question": "Is the Great Wall of China visible from the moon with the naked eye?", "correct_answer": False, "category": "Geography", "difficulty": "Medium", "explanation": "It is generally not visible without aid from such a distance."},
    {"question": "Is a group of pandas called an 'embarrassment'?", "correct_answer": True, "category": "Nature", "difficulty": "Hard", "explanation": "That is the scientific collective noun for pandas."},
    {"question": "Was the first iPhone released in 2007?", "correct_answer": True, "category": "Technology", "difficulty": "Easy", "explanation": "Steve Jobs unveiled the first iPhone on January 9, 2007."},
    {"question": "Is the capital of Australia Sydney?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "The capital city of Australia is Canberra."},
    {"question": "Does water boil at a lower temperature at high altitudes?", "correct_answer": True, "category": "Science", "difficulty": "Medium", "explanation": "Lower atmospheric pressure reduces the boiling point."},
    {"question": "Is Gold the most abundant metal in Earth's crust?", "correct_answer": False, "category": "Science", "difficulty": "Medium", "explanation": "Aluminum is the most abundant metal in the crust."},
    {"question": "Was Alexander the Great a pupil of Aristotle?", "correct_answer": True, "category": "History", "difficulty": "Medium", "explanation": "Aristotle tutored Alexander for several years in his youth."},
    {"question": "Is the human heart located on the right side of the chest?", "correct_answer": False, "category": "Biology", "difficulty": "Easy", "explanation": "The heart is typically located on the left side of the chest."},
    {"question": "Is Venus the hottest planet in our solar system?", "correct_answer": True, "category": "Space", "difficulty": "Medium", "explanation": "Its thick atmosphere traps heat, reaching temperatures over 460°C."},
    {"question": "Was Leonardo da Vinci the painter of 'The Starry Night'?", "correct_answer": False, "category": "Art", "difficulty": "Easy", "explanation": "Vincent van Gogh painted 'The Starry Night'."},
    {"question": "Is the Nile the longest river in the world?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "The Nile is widely considered the longest river on Earth."},
    {"question": "Can sharks swim backwards?", "correct_answer": False, "category": "Nature", "difficulty": "Medium", "explanation": "Most sharks lack the fin structures required to swim backwards."},
    {"question": "Is the chemical symbol for Silver 'Au'?", "correct_answer": False, "category": "Science", "difficulty": "Easy", "explanation": "'Au' is for Gold; Silver is 'Ag'."},
    {"question": "Was the Berlin Wall torn down in 1989?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "The wall fell on November 9, 1989."},
    {"question": "Is a triangle with all equal sides called a scalene triangle?", "correct_answer": False, "category": "Math", "difficulty": "Easy", "explanation": "It is an equilateral triangle."},
    {"question": "Does the human body have four lungs?", "correct_answer": False, "category": "Biology", "difficulty": "Easy", "explanation": "Humans have two lungs."},
    {"question": "Is Mount Kilimanjaro the tallest mountain in Africa?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "It is a dormant volcano in Tanzania."},
    {"question": "Was the internet originally a military project known as ARPANET?", "correct_answer": True, "category": "Technology", "difficulty": "Medium", "explanation": "It was funded by the US Department of Defense."},

    {"question": "Is the Amazon rainforest located primarily in Brazil?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Over 60% of the rainforest is in Brazil."},
    {"question": "Is the element Oxygen a liquid at room temperature?", "correct_answer": False, "category": "Science", "difficulty": "Easy", "explanation": "Oxygen is a gas at room temperature."},
    {"question": "Was the Eiffel Tower intended to be a temporary structure?", "correct_answer": True, "category": "History", "difficulty": "Medium", "explanation": "It was built for the 1889 World's Fair."},
    {"question": "Is a octopus considered a mammal?", "correct_answer": False, "category": "Nature", "difficulty": "Easy", "explanation": "Octopuses are cephalopod mollusks."},
    {"question": "Is the speed of light faster than the speed of sound?", "correct_answer": True, "category": "Physics", "difficulty": "Easy", "explanation": "Light travels much faster than sound."},

    {"question": "Was the Magna Carta signed in 1215?", "correct_answer": True, "category": "History", "difficulty": "Medium", "explanation": "King John signed it in 1215."},
    {"question": "Is the Sahara the largest desert in the world?", "correct_answer": False, "category": "Geography", "difficulty": "Hard", "explanation": "Antarctica is the largest desert."},
    {"question": "Is the capital of Japan Osaka?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "The capital is Tokyo."},
    {"question": "Does the moon produce its own light?", "correct_answer": False, "category": "Space", "difficulty": "Easy", "explanation": "It reflects sunlight."},
    {"question": "Is the human brain the largest organ?", "correct_answer": False, "category": "Biology", "difficulty": "Easy", "explanation": "Skin is the largest organ."},

    {"question": "Was George Washington the first US president?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "He served from 1789."},
    {"question": "Is a marathon 26.2 miles?", "correct_answer": True, "category": "Sports", "difficulty": "Easy", "explanation": "42.195 km."},
    {"question": "Is the Pacific Ocean the deepest?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "It has the Mariana Trench."},
    {"question": "Is sqrt(144)=12?", "correct_answer": True, "category": "Math", "difficulty": "Easy", "explanation": "12×12=144."},
    {"question": "Is Statue of Liberty from France?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Gift from France."},

    {"question": "Is Mars the Blue Planet?", "correct_answer": False, "category": "Space", "difficulty": "Easy", "explanation": "Earth is blue."},
    {"question": "Can ostriches fly?", "correct_answer": False, "category": "Nature", "difficulty": "Easy", "explanation": "They are flightless."},
    {"question": "Is Canada’s capital Toronto?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Ottawa is capital."},
    {"question": "Did Titanic sink in 1912?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Does water freeze at 0°C?", "correct_answer": True, "category": "Science", "difficulty": "Easy", "explanation": "At standard pressure."},

    {"question": "Is a spider an insect?", "correct_answer": False, "category": "Nature", "difficulty": "Easy", "explanation": "It is an arachnid."},
    {"question": "Is Mona Lisa in British Museum?", "correct_answer": False, "category": "Art", "difficulty": "Easy", "explanation": "It’s in Louvre."},
    {"question": "Is Great Barrier Reef largest living structure?", "correct_answer": True, "category": "Nature", "difficulty": "Medium", "explanation": "Visible from space."},
    {"question": "Was computer mouse invented by Xerox?", "correct_answer": True, "category": "Technology", "difficulty": "Hard", "explanation": "Developed at Xerox PARC."},
    {"question": "Is Italy’s capital Rome?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},

    {"question": "Do babies have more bones than adults?", "correct_answer": True, "category": "Biology", "difficulty": "Medium", "explanation": "They fuse later."},
    {"question": "Is UK currency Euro?", "correct_answer": False, "category": "Finance", "difficulty": "Easy", "explanation": "Pound Sterling."},
    {"question": "Was Abraham Lincoln 16th president?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is leap year every 4 years?", "correct_answer": True, "category": "General", "difficulty": "Easy", "explanation": "With exceptions."},
    {"question": "Is North Pole on continent?", "correct_answer": False, "category": "Geography", "difficulty": "Medium", "explanation": "Ocean ice."},

    {"question": "Is atom smallest unit?", "correct_answer": False, "category": "Science", "difficulty": "Medium", "explanation": "Subatomic particles exist."},
    {"question": "Did Wright brothers fly in 1903?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is Russia capital St Petersburg?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Moscow."},
    {"question": "Does honey never spoil?", "correct_answer": True, "category": "Nature", "difficulty": "Medium", "explanation": "Very long shelf life."},
    {"question": "Is ostrich largest bird?", "correct_answer": True, "category": "Nature", "difficulty": "Easy", "explanation": "Yes."},

    {"question": "Is Pacific smaller than Atlantic?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Pacific is biggest."},
    {"question": "Did Einstein create relativity?", "correct_answer": True, "category": "Science", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is heart a muscle?", "correct_answer": True, "category": "Biology", "difficulty": "Easy", "explanation": "Cardiac muscle."},
    {"question": "Is Spain capital Madrid?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is Earth orbit perfectly circular?", "correct_answer": False, "category": "Space", "difficulty": "Medium", "explanation": "Elliptical."},

    {"question": "Is diamond hardest natural substance?", "correct_answer": True, "category": "Science", "difficulty": "Easy", "explanation": "Mohs 10."},
    {"question": "Was Neil Armstrong first on moon?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "1969."},
    {"question": "Is Germany capital Munich?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Berlin."},
    {"question": "Do dolphins use echolocation?", "correct_answer": True, "category": "Nature", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is Amazon widest river?", "correct_answer": True, "category": "Geography", "difficulty": "Hard", "explanation": "Very wide."},

    {"question": "Was telephone invented by Edison?", "correct_answer": False, "category": "Technology", "difficulty": "Easy", "explanation": "Bell invented it."},
    {"question": "Is right lung bigger?", "correct_answer": True, "category": "Biology", "difficulty": "Medium", "explanation": "Left smaller for heart."},
    {"question": "Is Turkey capital Istanbul?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Ankara."},
    {"question": "Does Earth rotate every 24h?", "correct_answer": True, "category": "Space", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is Iron symbol Fe?", "correct_answer": True, "category": "Science", "difficulty": "Easy", "explanation": "From Latin ferrum."},

    {"question": "Was Sputnik first satellite?", "correct_answer": True, "category": "History", "difficulty": "Medium", "explanation": "1957 USSR."},
    {"question": "Is Brazil capital Rio?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Brasília."},
    {"question": "Do polar bears live in Antarctica?", "correct_answer": False, "category": "Nature", "difficulty": "Easy", "explanation": "They live in Arctic."},
    {"question": "Is Grand Canyon in California?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "Arizona."},
    {"question": "Is human body 60% water?", "correct_answer": True, "category": "Biology", "difficulty": "Easy", "explanation": "Approx."},

    {"question": "Is Greece capital Athens?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Do octopus have 3 hearts?", "correct_answer": True, "category": "Nature", "difficulty": "Medium", "explanation": "Yes."},
    {"question": "Is Sodium symbol So?", "correct_answer": False, "category": "Science", "difficulty": "Easy", "explanation": "Na."},
    {"question": "Was Ada Lovelace first programmer?", "correct_answer": True, "category": "Technology", "difficulty": "Hard", "explanation": "Yes."},
    {"question": "Is Egypt capital Cairo?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},

    {"question": "Do snakes have ears?", "correct_answer": False, "category": "Nature", "difficulty": "Medium", "explanation": "No external ears."},
    {"question": "Is Earth core solid?", "correct_answer": True, "category": "Earth", "difficulty": "Medium", "explanation": "Inner core solid."},
    {"question": "Was Civil War 1861–65?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Is India capital Mumbai?", "correct_answer": False, "category": "Geography", "difficulty": "Easy", "explanation": "New Delhi."},
    {"question": "Does Jupiter year ~12 Earth years?", "correct_answer": True, "category": "Space", "difficulty": "Hard", "explanation": "11.86 years."},

    {"question": "Is Potassium symbol P?", "correct_answer": False, "category": "Science", "difficulty": "Easy", "explanation": "K."},
    {"question": "Was Pong first video game?", "correct_answer": False, "category": "Technology", "difficulty": "Medium", "explanation": "Earlier games existed."},
    {"question": "Is South Korea capital Seoul?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Do cats have more bones than humans?", "correct_answer": True, "category": "Nature", "difficulty": "Hard", "explanation": "Yes."},
    {"question": "Is atmosphere mostly Oxygen?", "correct_answer": False, "category": "Science", "difficulty": "Medium", "explanation": "Mostly nitrogen."},

    {"question": "Was UN formed after WW1?", "correct_answer": False, "category": "History", "difficulty": "Easy", "explanation": "After WW2."},
    {"question": "Is Mexico capital Mexico City?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Do snails have more teeth than sharks?", "correct_answer": True, "category": "Nature", "difficulty": "Hard", "explanation": "Yes."},
    {"question": "Is GBR off Australia?", "correct_answer": True, "category": "Geography", "difficulty": "Easy", "explanation": "Yes."},
    {"question": "Was printing press by Gutenberg?", "correct_answer": True, "category": "History", "difficulty": "Easy", "explanation": "Yes."}
]
@app.route("/")
def home():
    return "Backend running!"

@app.route("/questions")
def get_questions():
    print("QUESTIONS ROUTE HIT")
    return jsonify(random.sample(QUESTIONS, 10))


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
