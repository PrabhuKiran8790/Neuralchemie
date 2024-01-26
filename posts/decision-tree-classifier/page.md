---
title: "Decision Trees: The Branching Path to Better Choices"
description: "See how trees work like flowcharts guiding the model in classifying the data!"
date: '2024-01-26'
image: '/posts/decision-tree-classifier/thumbnail.jpeg'
author:
    - Shayaan
tags: 
    - Machine Learning
    - Classification
draft: false
order: 8
---

Assume that you’re a traveller planning your next weekend getaway and have two amazing options: A relaxing beach trip to Goa or a thrilling mountain adventure in Lonavala. But, how do you decide one way or the other? This is where Decision Trees come in. They are like flowcharts, visually representing all the scenarios. Let’s look deeper into this example.

Our first question would be if the person is interested in beaches or mountains.
Another decisive question could be if the person is fit for a trek or a hike.

Let’s look at a visual representation of how a Decision Tree could help in this.

![](/posts/decision-tree-classifier/--light-flow1.png)
![](/posts/decision-tree-classifier/--dark-flow1.png)

Shown above is a standard representation of a hypothetical situation but there’s a lot of math that goes into it. Ready for it? Let’s get right in!

## Decision Tree Variants

The decision tree is not restricted to just classification or regression. There is a separate arithmetic calculation in each node for each of these variants. The variants are:

- Decision Tree Classifier
- Decision Tree Regressor

The Decision Tree evaluates each given feature to find the most relevant one and equates the results for that specific feature first. This is done until all the features are evaluated and the leaf node is encountered. A leaf node is defined as a node to which there are no Childs. This node is used for prediction. As for the tuning, the depth of the decision tree could be restricted, meaning that longest path between the root node and a leaf node is restricted to a specified number.

## Decision Tree Classifier

The decision tree classifier is very similar to a flow chart. Each node of decision tree has certain evaluations that go into it. There are two different ways to do this. One is Information Gain method, and the other is Gini Index method. Let’s look at the steps involved in building these and the Mathematics and Statistics behind it.

## Decision Tree Classifier: Information Gain Method

### Step 1: Calculate the Entropy of entire Dataset

Entropy is defined as randomness or uncertainty in the given data or situation. First step in building the decision tree classifier is to calculate the entropy of the entire dataset. This can be done by calculating the entropy of the label or the target column. The formula for this is:

```math
Entropy\,of\,Dataset =-\sum_{class=1}^{n}p(class) \, log_2\,(p(class))
```

```math
Where\;p(class) = \frac{Number\,of\,samples\,corresponding\,to\,the\,class}{Total\,number\,of\,samples}
```

### Step 2: Calculate Entropy of each Feature Column

When calculating entropy of each feature column, we need to first calculate entropy for each unique value in the selected feature column using the following equation. Select all the rows corresponding to selected value and calculate entropy with respect to those rows.

```math
Entropy\,of\,UniqueValue =\sum_{class=1}^{n}p(class) \, log_2\,(p(class))
```

```math
Where\;p(class) = \frac{Number\,of\,samples\,corresponding\,to\,the\,class\,and\,selected\,feature\,value}{Total\,number\,of\,samples}
```

After calculating the entropy for each unique value in the feature column, next step is to calculate the entropy of the feature column using the following arithmetic equation:

```math
Entropy\,of\,Feature = \sum_{UniqueVal=1}^n p(UniqueVal) . Entropy\,of\,UniqueVal
```

```math
Where\;p(class) = \frac{Number\,of\,samples\,corresponding\,to\,the\,UniqueVal}{Total\,number\,of\,samples}
```

Repeat this process for each feature column.

### Step 3: Information Gain Index

Information Gain is a measure used to determine which feature column is to be selected next.

```math
IG(Target,\,Feature) = Entropy\,of\,Dataset - Entropy\,of\,Feature
```

The value with highest Information Gain is selected to be the root node or the next node.

### Working Example

Now let’s look at how this works in practice. Consider the following dataset:

| Weather | Temperature | Humidity | Wind | Play Football |
| --- | --- | --- | --- | --- |
| Sunny | Hot | High | Weak | No |
| Sunny | Hot | High | Strong | No |
| Cloudy | Hot | High | Weak | Yes |
| Rainy | Mild | High | Weak | Yes |
| Rainy | Cool | Normal | Weak | Yes |
| Rainy | Cool | Normal | Strong | No |
| Cloudy | Cool | Normal | Strong | Yes |
| Sunny | Mild | High | Weak | No |
| Sunny | Cool | Normal | Weak | Yes |
| Rainy | Mild | Normal | Weak | Yes |
| Sunny | Mild | Normal | Strong | Yes |
| Cloudy | Mild | High | Strong | Yes |
| Cloudy | Hot | Normal | Weak | Yes |
| Rainy | Mild | High | Strong | No |

The Entropy of the entire dataset is:

```math
Entropy(Play\,Football) = -\frac{9}{14} log_2\frac{9}{14} - \frac{5}{14} log_2\frac{5}{14} = 0.94
```

Next step is to calculate Entropy for each feature column.

- For Weather:
    
    There are three unique values: Sunny, Rainy and Cloudy
    

```math
Entropy\,of\,Sunny=-\frac{2}{5}log_2\frac{2}{5}-\frac{3}{5}log_2\frac{3}{5} = 0.97
```

```math
Entropy\,of\,Rainy=-\frac{3}{5}log_2\frac{3}{5}-\frac{2}{5}log_2\frac{2}{5} = 0.97
```

```math
Entropy\,of\,Cloudy=-\frac{4}{4}log_2\frac{4}{4}-\frac{0}{4}log_2\frac{0}{4} = 0
```

```math
IG(Weather) = Entropy(Play Football) - \frac{5}{14} Entropy(Sunny) - \frac{5}{14} Entropy(Rainy) - \frac{4}{14} Entropy(Cloudy)
```

```math
IG(Weather) = 0.94 - \frac{5}{14} 0.97 - \frac{5}{14} 0.97 - \frac{4}{14} 0 = 0.247
```

- For Temperature:
    
    There are three unique values: Hot, Cool and Mild
    

```math
Entropy\,of\,Hot=-\frac{2}{4}log_2\frac{2}{4}-\frac{2}{4}log_2\frac{2}{4} = 1.0
```

```math
Entropy\,of\,Cool=-\frac{3}{4}log_2\frac{3}{4}-\frac{1}{4}log_2\frac{1}{4} = 0.81
```

```math
Entropy\,of\,Mild=-\frac{4}{6}log_2\frac{4}{6}-\frac{2}{6}log_2\frac{2}{6} = 0.918
```

```math
IG(Temperature) = Entropy(Play Football) - \frac{4}{14} Entropy(Hot) - \frac{4}{14} Entropy(Cool) - \frac{6}{14} Entropy(Mild)
```

```math
IG(Temperature) = 0.94 - \frac{4}{14} 1.0 - \frac{4}{14} 0.81 - \frac{6}{14} 0.918 = 0.03
```

- For Humidity:
    
    There are two unique values: High and Normal
    

```math
Entropy\,of\,High=-\frac{3}{7}log_2\frac{3}{7}-\frac{4}{7}log_2\frac{4}{7} = 0.98
```

```math
Entropy\,of\,Normal=-\frac{6}{7}log_2\frac{6}{7}-\frac{1}{7}log_2\frac{1}{7} = 0.59
```

```math
IG(Humidity) = Entropy(Play Football) - \frac{7}{14} Entropy(High) - \frac{7}{14} Entropy(Normal)
```

```math
IG(Humidity) = 0.94 - \frac{7}{14} 0.98 - \frac{7}{14} 0.59 = 0.15
```

- For wind:
    
    There are two unique values: Weak and Strong
    
```math
Entropy\,of\,Weak=-\frac{3}{6}log_2\frac{3}{6}-\frac{3}{6}log_2\frac{3}{6} = 1.0
```

```math
Entropy\,of\,Strong=-\frac{6}{8}log_2\frac{6}{8}-\frac{2}{8}log_2\frac{2}{8} = 0.81
```

```math
IG(Wind) = Entropy(Play Football) - \frac{6}{14} Entropy(Weak) - \frac{8}{14} Entropy(Strong)
```

```math
IG(Wind) = 0.94 - \frac{6}{14} 1.0 - \frac{8}{14} 0.81 = 0.05
```


Now that we have all the Information Gain Index, let’s analyze them.

| Feature | Information Gain |
| --- | --- |
| Weather | 0.247 |
| Temperature | 0.03 |
| Humidity | 0.15 |
| Wind | 0.05 |

The highest Information Gain is to be selected as root node. In this case, it is Weather. Hence, the decision tree we get now is:

![](/posts/decision-tree-classifier/--light-flow2.png)
![](/posts/decision-tree-classifier/--dark-flow2.png)

Now let’s do the further processing for the “Sunny” Condition. Consider the following dataset:

| Weather | Temperature | Humidity | Wind | Play Football |
| --- | --- | --- | --- | --- |
| Sunny | Hot | High | Weak | No |
| Sunny | Hot | High | Strong | No |
| Sunny | Mild | High | Weak | No |
| Sunny | Cool | Normal | Weak | Yes |
| Sunny | Mild | Normal | Strong | Yes |

```math
Entropy(Play Football) = -\frac{2}{5}log_2\frac{2}{5}-\frac{3}{5}log_2\frac{3}{5} = 0.97
```

- For Temperature:
    
    There are three values: Hot, Mild, Cool
    

```math
Entropy\,for\,Hot = -\frac{2}{2}log_2\frac{2}{2}-\frac{0}{2}log_2\frac{0}{2} = 0
```

```math
Entropy\,for\,Mild = -\frac{1}{2}log_2\frac{1}{2}-\frac{1}{2}log_2\frac{1}{2} = 1.0
```

```math
Entropy\,for\,Cool = -\frac{1}{1}log_2\frac{1}{1}-\frac{0}{1}log_2\frac{0}{1} = 0
```

```math
IG(Temperature) = Entropy(Play Football) - \frac{2}{5} Entropy(Hot) - \frac{2}{5} Entropy(Mild) - \frac{1}{5} Entropy(Cool)
```

```math
IG(Temperature) = 0.97 - \frac{2}{5} 0 - \frac{2}{5} 1.0 - \frac{1}{5} 0 = 0.57
```

- For Humidity:
    
    There are two values: High and Normal
    
```math
Entropy\,for\,High = -\frac{3}{3}log_2\frac{3}{3}-\frac{0}{3}log_2\frac{0}{3} = 0
```

```math
Entropy\,for\,Normal = -\frac{0}{2}log_2\frac{0}{2}-\frac{2}{2}log_2\frac{2}{2} = 0
```

```math
IG(Humidity) = Entropy(Play Football) - \frac{3}{5} Entropy(High) - \frac{2}{5} Entropy(Normal)
```

```math
IG(Humidity) = 0.97 - \frac{3}{5} 0 - \frac{2}{5} 0 = 0.97
```

- For Wind:
    
    There are two values: Weak and Strong 

```math
Entropy\,for\,Weak = -\frac{1}{3}log_2\frac{1}{3}-\frac{2}{3}log_2\frac{2}{3} = 0.918
```

```math
Entropy\,for\,Strong = -\frac{1}{2}log_2\frac{1}{2}-\frac{1}{2}log_2\frac{1}{2} = 1.0
```

```math
IG(Wind) = Entropy(Play Football) - \frac{3}{5} Entropy(Weak) - \frac{2}{5} Entropy(Strong)
```

```math
IG(Wind) = 0.97 - \frac{3}{5} 0.918 - \frac{2}{5} 1.0 = 0.02
```

Let’s check all the Information Gain Indexes:

| Feature | Information Gain |
| --- | --- |
| Temperature | 0.57 |
| Humidity | 0.97 |
| Wind | 0.02 |

Since the highest is Humidity, the Humidity node comes after Sunny.

From the dataset, we can clearly notice that when Humidity is high, football is not played and when it is normal, football is played. Hence we can insert a leaf node or output node for this.

The resulting decision tree is as follows:

![](/posts/decision-tree-classifier/--light-flow3.png)
![](/posts/decision-tree-classifier/--dark-flow3.png)

Now let’s check the data for Rainy:

| Weather | Temperature | Humidity | Wind | Play Football |
| --- | --- | --- | --- | --- |
| Rainy | Mild | High | Weak | Yes |
| Rainy | Cool | Normal | Weak | Yes |
| Rainy | Cool | Normal | Strong | No |
| Rainy | Mild | Normal | Weak | Yes |
| Rainy | Mild | High | Strong | No |

```math
Entropy(Play Football) = -\frac{2}{5}log_2\frac{2}{5}-\frac{3}{5}log_2\frac{3}{5} = 0.97
```

- For Temperature:
    
    There are two values: Mild, Cool 

```math
Entropy\,for\,Mild = -\frac{2}{3}log_2\frac{2}{3}-\frac{1}{3}log_2\frac{1}{3} = 0.92
```

```math
Entropy\,for\,Cool = -\frac{1}{2}log_2\frac{1}{2}-\frac{1}{2}log_2\frac{1}{2} = 1.0
```

```math
IG(Temperature) = Entropy(Play Football) - \frac{3}{5} Entropy(Mild) - \frac{2}{5} Entropy(Cool)
```

```math
IG(Temperature) = 0.97 - \frac{3}{5} 0.92 - \frac{2}{5} 1.0 = 0.02
```

- For Humidity:
    
    There are two values: High and Normal 

```math
Entropy\,for\,High = -\frac{1}{2}log_2\frac{1}{2}-\frac{1}{2}log_2\frac{1}{2} = 1.0
```

```math
Entropy\,for\,Normal = -\frac{2}{3}log_2\frac{2}{3}-\frac{1}{3}log_2\frac{1}{3} = 0.92
```

```math
IG(Humidity) = Entropy(Play Football) - \frac{2}{5} Entropy(High) - \frac{3}{5} Entropy(Normal)
```

```math
IG(Humidity) = 0.97 - \frac{2}{5} 1.0 - \frac{3}{5} 0.92 = 0.02
```

- For Wind:
    
    There are two values: Weak and Strong
    

```math
Entropy\,for\,Weak = -\frac{3}{3}log_2\frac{3}{3}-\frac{0}{3}log_2\frac{0}{3} = 0
```

```math
Entropy\,for\,Strong = -\frac{2}{2}log_2\frac{2}{2}-\frac{2}{2}log_2\frac{2}{2} = 0
```

```math
IG(Wind) = Entropy(Play Football) - \frac{3}{5} Entropy(Weak) - \frac{2}{5} Entropy(Strong)
```

```math
IG(Wind) = 0.97 - \frac{3}{5} 0 - \frac{2}{5} 0 = 0.97
```

Let’s check all the Information Gain Indexes:

| Feature | Information Gain |
| --- | --- |
| Temperature | 0.02 |
| Humidity | 0.02 |
| Wind | 0.97 |

Since the highest is Wind, the Wind node comes after Rainy.

It can be seen that when Wind is Strong, football is not played and when it is Weak, football is played. Hence we can insert a leaf node or output node for this.

The resulting decision tree is as follows:

![](/posts/decision-tree-classifier/--light-flow4.png)
![](/posts/decision-tree-classifier/--dark-flow4.png)

Now let’s look at the data for cloudy weather!

| Weather | Temperature | Humidity | Wind | Play Football |
| --- | --- | --- | --- | --- |
| Cloudy | Hot | High | Weak | Yes |
| Cloudy | Cool | Normal | Strong | Yes |
| Cloudy | Mild | High | Strong | Yes |
| Cloudy | Hot | Normal | Weak | Yes |

We can see that all the labels are “Yes” in this data. Hence we can conclude that for cloudy weather, football will be played regardless of temperature, humidity and wind.

The final decision tree constructed will be as follows:

![](/posts/decision-tree-classifier/--light-flow5.png)
![](/posts/decision-tree-classifier/--dark-flow5.png)

## Decision Tree Classifier: Gini Index Method

Gini index is very similar to Information Gain Index. Here are the equations and steps with respect to Gini-Index Method. Gini Index is a more powerful measure of entropy in datasets and is hence proven to be more effective than Information Gain.

### Step 1: Calculate Gini-Index of each Feature Column

```math
Gini\,Index\,of\,UniqueValue =1 - \sum_{class=1}^{n}p(class)^2
```

```math
Where\;p(class) = \frac{Number\,of\,samples\,corresponding\,to\,the\,class\,and\,selected\,feature\,value}{Total\,number\,of\,samples}
```

After calculating the entropy for each unique value in the feature column, next step is to calculate the entropy of the feature column using the following arithmetic equation:

```math
Entropy\,of\,Feature = \sum_{UniqueVal=1}^n p(UniqueVal) . Gini\,Index\,of\,UniqueVal
```

```math
Where\;p(class) = \frac{Number\,of\,samples\,corresponding\,to\,the\,UniqueVal}{Total\,number\,of\,samples}
```

Repeat this process for each feature column.

### Step 2: Select the Attribute with Lowest Gini-Index as Decision Node

The feature with lowest gini-index is utilized as the decision node and the process is repeated until leaf node is achieved.

### Working Example

Consider the following data:

| Temperature | Humidity | Wind | Play Football |
| --- | --- | --- | --- |
| Hot | High | Weak | No |
| Hot | High | Strong | No |
| Mild | High | Weak | No |
| Cool | Normal | Weak | Yes |
| Mild | Normal | Strong | Yes |
- For Temperature:
    
    There are 3 values: Hot, Mild and Cool
    

```math
Gini(Hot) = 1 - p(Yes)^2 - p(No)^2
```

```math
Gini(Hot) = 1 - (\frac{0}{2})^2 - (\frac{2}{2})^2 = 0
```

```math
Gini(Mild) = 1 - (\frac{1}{2})^2 - (\frac{1}{2})^2 = 0.5
```

```math
Gini(Cool) = 1 - (\frac{1}{1})^2 - (\frac{0}{1})^2 = 0
```

```math
Gini(Temperature) = \frac{2}{5} 0 + \frac{2}{5}0.5 + \frac{1}{5}0 = 0.2
```

- For Humidity:
    
    There are two values: High and Normal
    

```math
Gini(High) = 1 - (\frac{0}{3})^2 - (\frac{3}{3})^2 = 0
```

```math
Gini(Normal) = 1 - (\frac{2}{2})^2 - (\frac{0}{2})^2 = 0
```

```math
Gini(Humidity) = \frac{3}{5} 0 + \frac{2}{5}0 = 0
```

- For Wind:
    
    There are two values: Weak and Strong
    

```math
Gini(Weak) = 1 - (\frac{1}{3})^2 - (\frac{2}{3})^2 = 0.44
```

```math
Gini(Strong) = 1 - (\frac{1}{2})^2 - (\frac{1}{2})^2 = 0.5
```

```math
Gini(Wind) = \frac{3}{5} 0.44 + \frac{2}{5} 0.5 = 0.464
```

| Feature | Gini Index |
| --- | --- |
| Temperature | 0.2 |
| Humidity | 0 |
| Wind | 0.464 |

The lowest Gini Index is of Humidity. Therefore Humidity is selected as decision node.

Therefore the tree that is formed is:

![](/posts/decision-tree-classifier/--light-flow6.png)
![](/posts/decision-tree-classifier/--dark-flow6.png)

## Python Implementation of Decision Tree Classifier

Following is the Python code for decision tree classifier:

```python
# Import Required Modules
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import pandas as pd
import matplotlib.pyplot as plt

# Data Reading Pre-Processing
data = pd.read_excel("data.xlsx")
data['Weather'].replace(['Sunny','Rainy','Cloudy'], [0,1,2], inplace=True)
data['Temperature'].replace(['Hot','Cool','Mild'], [0,1,2], inplace=True)
data['Humidity'].replace(['High','Normal'], [0,1], inplace=True)
data['Wind'].replace(['Weak','Strong'], [0,1], inplace=True)
data['Play Football'].replace(['No','Yes'], [0,1], inplace=True)

# Separating Features and Label
x = data.drop("Play Football", axis=1)
y = data[["Play Football"]]

# Model Training
model = DecisionTreeClassifier()
model.fit(x, y)

# Confusion Matrix
cm = confusion_matrix(y, model.predict(x))
ConfusionMatrixDisplay(cm).plot()

# Append predicted values to data to display
data = pd.read_excel("data.xlsx")
data["Model Predictions"] = model.predict(x)
data['Model Predictions'].replace([0,1], ["No","Yes"], inplace=True)
```

The Confusion Matrix produced by this code is as follows:

![Confusion Matrix](/posts/decision-tree-classifier/cm.png)

It can be interpreted by this confusion matrix that all the predictions were accurate and there were 5 true negatives and 9 true positives.

This is all about the Decision Tree Classifier. If you have any questions regarding this, feel free to contact me.

Up next, we have the Decision Tree Regressor where we train the Decision Tree Algorithm to work with continuous values. Stay Tuned!
