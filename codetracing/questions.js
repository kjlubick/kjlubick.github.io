const questions = [
{
  name: "Variables Tutorial 1",
  code: `x = 14
y = -3
x = y`,
  vars: 2, 
  max_steps: 3,
  answer: {
    x: ['14', '14', '-3'],
    y: ['-', '-3'],
  },
  solved_code: 'EDR4N3K',
},
{
  name: "Variables Tutorial 2",
  code: `peanut = 22
butter = 16
butter = peanut`,
  vars: 2, 
  max_steps: 3,
  answer: {
    peanut: ['22', '22', '22'],
    butter: ['-', '16', '22'],
  },
  solved_code: 'R4KZ2QW',
},
{
  name: "Variables Tutorial 3",
  code: `tv_show = "24"
name = "Tom Hanks"
profession = "Actor"
tv_show = name
name = profession`,
  vars: 3, 
  max_steps: 5,
  answer: {
    tv_show: ['"24"', '"24"', '"24"', '"Tom Hanks"'],
    name: ['-', '"Tom Hanks"', '"Tom Hanks"', '"Tom Hanks"', '"Actor"'],
    profession: ['-', '-', '"Actor"'],
  },
  solved_code: 'IHPAG84',
},
{
  name: "Variables Practice 1",
  code: `xray = 18
kilo = 7
foxtrot = -4
kilo = foxtrot
foxtrot = xray`,
  vars: 3, 
  max_steps: 5,
  answer: {
    xray: ['18'],
    kilo : ['-', '7', '7', '-4'],
    foxtrot: ['-', '-', '-4', '-4', '18'],
  },
  solved_piece: 'X7F',
},
{
  name: "Variables Practice 2",
  code: `red = "red"
blue = "yellow"
red = blue
red = "toast"`,
  vars: 2, 
  max_steps: 4,
  answer: {
    red: ['"red"', '"red"', '"yellow"', '"toast"'],
    blue: ['-', '"yellow"'],
  },
  solved_piece: 'R2M',
},
{
  name: "Operators Tutorial 1",
  code: `a = 10.5
b = 6.0
a = b + 2
b = 3`,
  vars: 2, 
  max_steps: 4,
  answer: {
    a: ['10.5', '10.5', '8.0', '8.0'],
    b: ['-', '6.0', '6.0', '3'],
  },
  solved_code: "R7TF9MK",
},
{
  name: "Operators Tutorial 2",
  code: `my_var = 3
my_var += 1
my_var == 17
my_var ** 5
print(my_var * 10)
my_var *= 2`,
  vars: 1, 
  max_steps: 6,
  answer: {
    my_var: ['3', '4', '4', '4', '4', '8'],
  },
  solved_code: "WDHP6RV",
},
{
  name: "Operators Tutorial 3",
  assumption: "Assume the user types in 7",
  code: `some_var = input("Type a number ")
n = int(some_var)
cupcake = 44 // n
cupcake = 2 ** n
cupcake -= 3`,
  vars: 3, 
  max_steps: 5,
  answer: {
    some_var: ['"7"'],
    n: ['-', '7'],
    cupcake: ['-', '-', '6', '128', '125']
  },
  solved_code: "N47Q56D",
},
{
  name: "Operators Practice 1",
  code: `alpha = 2
beta = 11
gamma = beta * alpha + 2
beta = alpha
alpha = 0`,
  vars: 3, 
  max_steps: 5,
  answer: {
    alpha: ['2', '2', '2', '2', '0'],
    beta: ['-', '11', '11', '2'],
    gamma: ['-', '-', '24'],
  },
  solved_piece: "JBQ",
},
{
  name: "Operators Practice 2",
  code: `apple = 17
apple += 4
apple -= 10
apple *= 2`,
  vars: 1, 
  max_steps: 4,
  answer: {
    apple: ['17', '21', '11', '22'],
  },
  solved_piece: "CJ5",
},
{
  name: "Operators Practice 3",
  code: `apple = 17
apple + 4
apple - 10
apple * 2`,
  vars: 1, 
  max_steps: 4,
  answer: {
    apple: ['17'],
  },
  solved_piece: "3QA",
},
{
  name: "Operators Practice 4",
  assumption: "Assume the user types in 12 for the first input and 4 for the second input. Yes you can use a calculator.",
  code: `pizza_size = float(input("How big is the pizza? "))
num_people = int(input("How many people? "))
a = pizza_size / 2
a = a ** 2
a *= 3.1
per_person = a / num_people
print("about this much per person", per_person)`,
  vars: 4, 
  max_steps: 7,
  answer: {
    pizza_size: ['12.0'],
    num_people: ['-', '4'],
    a: ['-', '-', '6.0', '36.0', '111.6'],
    per_person: ['-', '-', '-', '-', '-', '27.9'],
  },
  solved_piece: "V2Z",
},
{
  name: "Conditionals Tutorial 1",
  assumption: "Assume the user types in 6 for the input.",
  code: `age = int(input("Age? "))
cost = 14
if age >= 60:
  cost *= 0.90
elif age <= 8:
  cost *= 0.5
print("Please pay $", cost)`,
  vars: 2, 
  max_steps: 6,
  answer: {
    line: ['1','2','3','5','6','7'],
    age: ['6'],
    cost: ['-','14','14','14','7.0'],
  },
  solved_code: "D589X2N",
},
{
  name: "Conditionals Tutorial 2",
  assumption: "Assume the user types in 75 for the input.",
  code: `age = int(input("Age? "))
cost = 14
if age >= 60:
  cost *= 0.90
elif age <= 8:
  cost *= 0.5
print("Please pay $", cost)`,
  vars: 2, 
  max_steps: 5,
  answer: {
    line: ['1','2','3','4','7'],
    age: ['75'],
    cost: ['-', '14', '14', '12.6'],
  },
  solved_code: "K20W51D",
},
{
  name: "Conditionals Tutorial 3",
  assumption: "Assume the user types in 27 for the input.",
  code: `age = int(input("Age? "))
cost = 14
if age >= 60:
  cost *= 0.90
elif age <= 8:
  cost *= 0.5
print("Please pay $", cost)`,
  vars: 2, 
  max_steps: 5,
  answer: {
    line: ['1','2','3','5','7'],
    age: ['27'],
    cost: ['-', '14'],
  },
  solved_code: "WLV56MK",
},
{
  name: "Conditionals Practice 1",
  assumption: "Assume the user types in 850 for the input.",
  code: `cost = 50
area = input("How many square feet? ")
area = int(area)
if area <= 1000:
  samples = 3
elif area <= 1500:
  samples = 5
else:
  samples = 7
cost += samples * 11`,
  vars: 3, 
  max_steps: 6,
  answer: {
    line: ['1','2','3','4','5','10'],
    cost: ['50','50','50','50','50','83'],
    area: ['-', '"850"','850'],
    samples: ['-','-','-','-','3'],
  },
  solved_piece: "A8P",
},
{
  name: "Conditionals Practice 2",
  assumption: "Assume the user types in no for the first input. Assume they type in medium for the second input.",
  code: `add_gift_wrap = input("Gift wrap? ")
shipping_speed = input("Shipping speed? ")
weight = 3
total_cost = 50  # retail price
if add_gift_wrap == "yes":
    total_cost += 5
if shipping_speed == "fast":
    shipping_cost = weight * 3
elif shipping_speed == "slow":
    shipping_cost = weight * 1
else:
    shipping_cost = weight * 2
total_cost += shipping_cost
print("Your total is", total_cost)`,
  vars: 5, 
  max_steps: 11,
  answer: {
    line: ['1','2','3','4','5','7','9','11','12','13','14'],
    add_gift_wrap: ['"no"'],
    shipping_speed: ['-','"medium"'],
    weight: ['-', '-', '3'],
    shipping_cost: ['-','-','-','-','-','-','-','-','6'],
    total_cost: ['-','-','-','50','50','50','50','50','50','56'],
  },
  solved_piece: "Z3H",
},
{
  name: "Conditionals Practice 3",
  assumption: 'Assume the user types in "Uncopyrightable"',
  code: `word = input("Type a word ")
answer = ""
if len(word) > 10:
    answer = word[0]
    answer += word[2]
    answer = answer + word[7]
    answer = word[5] + answer
else:
    if "fish" in word:
        answer = "whale"
        answer += word[-1]
    else:
        answer = word + word
        answer = answer * 2
if answer.isnumeric():
    answer = int(answer)
print("result", answer)`,
  vars: 2, 
  max_steps: 9,
  answer: {
    line: ['1','2','3','4','5','6','7','15','17'],
    word: ['"Uncopyrightable"'],
    answer: ['-','""','""','"U"','"Uc"','"Uci"','"yUci"'],
  },
  solved_piece: "W2E",
},
{
  name: "Conditionals Practice 4",
  assumption: 'Assume the user types in 174',
  code: `word = input("Type a word ")
answer = ""
if len(word) > 10:
    answer = word[0]
    answer += word[2]
    answer = answer + word[7]
    answer = word[5] + answer
else:
    if "fish" in word:
        answer = "whale"
        answer += word[-1]
    else:
        answer = word + word
        answer = answer * 2
if answer.isnumeric():
    answer = int(answer)
print("result", answer)`,
  vars: 2, 
  max_steps: 11,
  answer: {
    line: ['1','2','3','8', '9','12','13','14','15','16','17'],
    word: ['"174"'],
    answer: ['-','""','""','""','""','""', '"174174"','"174174174174"','"174174174174"','174174174174'],
  },
  solved_piece: "BCX",
},
  {
  name: "Conditionals Practice 5",
  assumption: "Assume the user types in 71 for the first input. Assume they type in 95 for the second input. You only need to type in up to 3 digits past the decimal point (but don't round until the end.",
  code: `# https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
import math
temp_f = input("What is the temperature (°F)? ")
temp_f = float(temp_f)
humidity = input("What is percent humidity (0-100)? ")
humidity = float(humidity)

heat_index = -42.379 + 2.0490 * temp_f
heat_index += 10.143 * humidity
heat_index -= 0.22476 * temp_f * humidity
heat_index -= 0.0068378 * temp_f ** 2
heat_index -= 0.054817 * humidity ** 2
heat_index += 0.0012287 * (temp_f ** 2) * humidity 
heat_index += 0.00085282 * temp_f * (humidity ** 2)
heat_index -= 0.00000199 * (temp_f ** 2) * (humidity ** 2)

if humidity < 13 and temp_f >= 80 and temp_f <= 112:
    adjustment = (13 - humidity) / 4
    adjustment *= math.sqrt((17 - abs(temp_f - 95)) / 17)
    heat_index -= adjustment
    
if humidity > 85 and temp_f >= 80 and temp_f <= 87:
    adjustment = (humidity - 85) / 10
    adjustment *= (87 - temp_f) / 5
    heat_index += adjustment

if heat_index <= 80:
    heat_index = temp_f + 61.0
    heat_index += 1.2 * (temp_f - 68.0)
    heat_index += humidity * 0.094
    heat_index /= 2

heat_index = round(heat_index, 0)
print(f"The heat index at {temp_f}°F with {humidity}% humidity is {heat_index}")`,
  vars: 3, 
  max_steps: 22,
  answer: {
    line: ['2', '3', '4', '5', '6', 
           '8', '9', '10', '11',
           '12', '13', '14', '15', 
           '17', '22', '27',
           '28', '29', '30', '31',
           '33', '34'],
    temp_f: ['-', '"71"', '71.0'],
    humidity: ['-','-','-', '"95"', '95.0'],
    heat_index: ['-','-','-', '-', '-', 
                 '103.1', '1066.685', '-449.321', '-483.790',
                 '-978.514', '-390.095', '156.37', '65.834',
                 '65.834', '65.834', '65.834',
                 '132.0', '135.6', '144.53', '72.265',
                 '72.0'],
  },
  solved_piece: "FJM",
},
{
  name: "Lists Practice 1",
  code: `my_list = [9, 7, 5]
my_list.pop()
my_list.append(11)
my_list[1] = 13
my_list.append(8)
print(len(my_list))`,
  vars: 1, 
  max_steps: 6,
  answer: {
    my_list: ['[9,7,5]', '[9,7]', '[9,7,11]', '[9,13,11]', '[9,13,11,8]'],
  },
  solved_piece: "HBB",
},
{
  name: "Lists Practice 2",
  code: `some_list = ["A", "B", "CC", "D", "EE", "F", "G"]
if "F" in some_list:
    some_list.pop()
    some_list.pop()
if "C" in some_list:
    some_list.append("HH")
if some_list[-1] == "E":
    some_list.append("i")
elif some_list[-1] == "EE":
    some_list.pop()
else:
    some_list.append("done")
some_list[2] = "GGG"`,
  vars: 1, 
  max_steps: 9,
  answer: {
    line: ['1', '2', '3', '4', '5', '7', '9', '10', '13'],
    some_list: [
      '["A","B","CC","D","EE","F","G"]',
      '["A","B","CC","D","EE","F","G"]',
      '["A","B","CC","D","EE","F"]',
      '["A","B","CC","D","EE"]',
      '["A","B","CC","D","EE"]',
      '["A","B","CC","D","EE"]',
      '["A","B","CC","D","EE"]',
      '["A","B","CC","D"]',
      '["A","B","GGG","D"]',
    ],
  },
  solved_piece: "Y4S",
},{
  assumption: 'Assume the user types in "Grep"',
  name: "For Loop Tutorial 1",
  code: `user_input = input("Type a word: ")
result = ""
for stepper in user_input:
    result = result + stepper
    result = stepper + result
result += "..."`,
  vars: 3, 
  max_steps: 16,
  answer: {
    line: ['1','2','3','4','5','3','4','5','3','4','5','3','4','5','3','6'],
    user_input: ['"Grep"'],
    result: ['-','""','""','"G"','"GG"','"GG"',
    '"GGr"','"rGGr"','"rGGr"','"rGGre"', '"erGGre"',
    '"erGGre"', '"erGGrep"', '"perGGrep"', '"perGGrep"',
    '"perGGrep..."'],
    stepper: ['-','-','"G"','"G"','"G"','"r"','"r"','"r"','"e"','"e"','"e"','"p"'],
  },
  solved_code: "GT7MAKT",
},{
  assumption: 'Assume the user types in "47"',
  name: "For Loop Tutorial 2",
  code: `num = int(input("Type a number "))
for i in range(0, 6, 1):
    if num % 2 == 0:
        num = num // 2
    else:
        num += 3
if num < 10:
    print("Lucky")
else:
    print("Unlucky")`,
  vars: 2, 
  max_steps: 22,
  answer: {
    line: ['1','2','3','6','2','3','4','2','3','6',
    '2','3','4','2','3','4','2','3','6','2','7','10'],
    num: ['47','47','47','50','50','50','25','25','25',
    '28','28','28','14','14','14','7','7','7','10'],
    i: ['-','0','0','0','1','1','1','2','2','2',
    '3','3','3','4','4','4','5','5','5'],
  },
  solved_code: "FMZ9SCVJ",
},
{
  name: "For Loop Practice 1",
  code: `grades = [40, 20, 90]
total = 0
for grade in grades:
    adjusted = grade * 1.5
    total = total + adjusted
denom = len(grades)
print(total / denom)`,
  vars: 5, 
  max_steps: 14,
  answer: {
    line: ['1','2','3','4','5','3','4','5','3','4','5','3','6','7'],
    grades: ['[40,20,90]'],
    total: ['-','0','0','0','60','60','60','90','90','90','225'],
    grade: ['-','-','40','40','40','20','20','20','90'],
    adjusted: ['-','-','-','60','60','60','30','30','30','135'],
    denom: ['-','-','-','-','-','-','-','-','-','-','-','-','3'],
  },
  solved_piece: "SYB",
},
{
  name: "For Loop Practice 2",
  code: `equation = 0
for number in range(10, 20, 3):
    equation += number
    equation = equation // 3
equation = 10 - equation`,
  vars: 2, 
  max_steps: 15,
  answer: {
    line: ['1','2','3','4','2','3','4','2','3','4',
    '2','3','4','2','5'],
    equation: ['0','0','10','3','3','16','5','5',
    '21','7','7','26','8','8','2'],
    number: ['-','10','10','10','13','13','13',
    '16','16','16','19','19','19'],
  },
  solved_piece: "KTH",
},{
  name: "For Loop Practice 3",
  code: `words = ["green", "blue", "pink", "yellow"]
ok = True
for letter in words:
    a = "e" not in letter
    b = len(letter) >= 10
    if a or b:
        ok = False
if not ok:
    print("Invalid colors")`,
  vars: 5, 
  max_steps: 22,
  answer: {
    line: ['1','2','3','4','5','6',
    '3','4','5','6',
    '3','4','5','6','7',
    '3','4','5','6',
    '3','8','9'],
    words: ['["green","blue","pink","yellow"]'],
    ok: ['-','True','True','True','True','True',
    'True','True','True','True',
    'True','True','True','True','False'],
    letter: ['-', '-', 
    '"green"','"green"','"green"','"green"',
    '"blue"','"blue"','"blue"','"blue"',
    '"pink"','"pink"','"pink"','"pink"','"pink"',
    '"yellow"'],
    b: ['-','-','-','-','False'],
    a: ['-','-','-','False','False','False',
    'False','False','False','False',
    'False','True','True','True','True',
    'True','False'],
  },
  solved_piece: "YUE",
},{
  name: "For Loop Practice 4",
  code: `colors = ["green", "blue", "pink", "yellow"]
special = ""
for number in colors:
    a = len(number)
    b = len(special)
    if a > b:
        special = number
print("The special value is", special)`,
  vars: 5, 
  max_steps: 22,
  answer: {
    line: ['1','2','3','4','5','6','7',
    '3','4','5','6',
    '3','4','5','6',
    '3','4','5','6','7',
    '3','8'],
    colors: ['["green","blue","pink","yellow"]'],
    special: ['-','""','""','""','""','""','"green"',
    '"green"','"green"','"green"','"green"',
    '"green"','"green"','"green"','"green"',
    '"green"','"green"','"green"','"green"','"yellow"',
    ],
    number: ['-', '-', 
    '"green"','"green"','"green"','"green"','"green"',
    '"blue"','"blue"','"blue"','"blue"',
    '"pink"','"pink"','"pink"','"pink"',
    '"yellow"'],
    a: ['-','-','-','5','5','5','5',
    '5','4','4','4',
    '4','4','4','4',
    '4','6'],
    b: ['-','-','-','-','0','0','0',
    '0','0','5'],
  },
  solved_piece: "EWQ",
},{
  name: "Function Tutorial 1",
  code: `def dog():
    print("bark")
    print("woof")

def cat():
    print("meow")
    print("*scratch*")
    print("hiss")

def fish():
    print("*splash*")

cat()
dog()
dog()
print("food time!")`,
  vars: 0, 
  max_steps: 17,
  answer: {
    line: ['1', '5', '10',
    '13', '5', '6', '7', '8',
    '14', '1', '2', '3',
    '15', '1', '2', '3', '16'],
  },
  solved_code: "S753UD4P",
},{
  name: "Function Tutorial 2",
  code: `def alpha():
    print("avocado")

def beta():
    alpha()
    print("banana")
    
def epsilon():
    print("eggplant")
    beta()

beta()
epsilon()
print("zucchini")`,
  vars: 0, 
  max_steps: 19,
  answer: {
    line: ['1', '4', '8',
    '12', '4', '5', '1', '2', '6',
    '13', '8', '9', '10',
    '4', '5', '1', '2', '6', '14'],
  },
  solved_code: "WANRQYD3",
},{
  name: "Function Tutorial 3",
  assumption: "Assume the user types in 250",
  code: `subtotal = float(input("Subtotal? "))

def final_price(cart):
    cost = cart + 10.00 # shipping
    cost *= 1.05        # tax
    return cost

total = final_price(subtotal)
members = final_price(subtotal * 0.90)
print("Please pay: {}".format(total))
print("Members price: {}".format(members))`,
  vars: 5, 
  max_steps: 14,
  answer: {
    line: ['1','3','8','3','4','5','6','9',
    '3','4','5','6','10','11'],
    subtotal: ['250.0'],
    // Arbitrary decision - outer variables are created
    // on the line that returns the value. Easier to
    // explain, IMO.
    total: ['-','-','-','-','-','-','273.0'],
    members: ['-','-','-','-','-','-','-',
    '-','-','-','-','246.75'],
    cart: ['-','-','-','250.0','250.0','250.0','250.0',
    '-','225.0','225.0','225.0','225.0','-'],
    cost: ['-','-','-','-', '260.0', '273.0', '273.0',
    '-','-','235.0','246.75','246.75','-'],
  },
  solved_code: "KA3M29A",
},{
  name: "Function Practice 1",
  assumption: "Assume the user types zucchini for the first input and muskmelons for the second input",
  code: `def smoosh(word):
    rv = word[0]
    mid = len(word) // 2
    rv += word[mid]
    rv += word[-1]
    return rv

favorite = input("Type a word: ")
result = smoosh(favorite)
print("SMOOOOSH", result)
favorite = input("Type another word: ")
result = smoosh(favorite)
print("CRAAASH", result)`,
  vars: 5, 
  max_steps: 19,
  answer: {
    line: ['1','8','9','1','2','3','4','5','6',
    '10','11','12','1','2','3','4','5','6','13'],
    favorite: ['-','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"muskmelons"'],
    result: ['-','-','-','-','-','-','-','-','"zhi"',
    '"zhi"','"zhi"','"zhi"','"zhi"','"zhi"','"zhi"','"zhi"','"zhi"','"mes"'],
    word: ['-','-','-','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"','"zucchini"',
    '-','-','-','"muskmelons"','"muskmelons"','"muskmelons"','"muskmelons"','"muskmelons"','"muskmelons"','-'],
    rv: ['-','-','-','-','"z"','"z"','"zh"','"zhi"','"zhi"',
    '-','-','-','-','"m"','"m"','"me"','"mes"','"mes"','-'],
    mid: ['-','-','-','-','-','4','4','4','4','-','-','-',
    '-','-','5','5','5','5','-'],
  },
  solved_piece: "MSK",
}
];

const levelsEle = document.getElementById("levels");
let i = 0;
for (const q of questions) {
  q.total_cols = q.vars;
  if (q.answer.line) {
    q.total_cols++;
  }
  const option = document.createElement("option");
  option.value = i;
  option.innerText = q.name;
  levelsEle.appendChild(option);
  i++;
}

levels.addEventListener("change", (e) => {
  displayLevel(levelsEle.selectedIndex)
})