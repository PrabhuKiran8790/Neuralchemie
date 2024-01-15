---
title: 'Taming the Number Game: How Cost Functions guide your ML Model to Victory'
description: 'Find out about cost functions, a fundemental concept in optimization of machine learning models'
date: '2024-01-15'
author:
    - Raamiz
    - Shayaan
image: '/posts/cost-functions/thumbnail.jpeg'
tags: 
    - Loss Functions
    - Machine Learning
draft: false
order: 3
---

On the third day of 100 days of AI, we are exploring the cost functions that are used in machine learning. In the realm of machine learning, ensuring models function effectively in real-world applications hinges upon their ability to deliver accurate predictions. But how do we accurately assess the performance of these models? 

This is where cost functions emerge as a crucial tool. Cost functions act as a numerical gauge, They serve as an invaluable guidepost during the model training process, steering model adjustments towards greater precision.

By effectively comprehending cost functions, we gain a profound understanding of how adeptly a model has grasped the underlying connections between input data and the corresponding outputs. This understanding proves indispensable for crafting machine learning models that not only excel in controlled environments but also confidently navigate the complexities of real-world scenarios.

## What is a Cost Function?

Imagine you're playing a guessing game with your friend, but instead of words, you're guessing numbers. Your goal is to guess the secret number your friend picked as close as possible. Each time you guess, your friend tells you how far off you were: "Too high!" or "Too low!".

Here's where the cost function comes in! It's like a scorekeeper in this game. Every time you guess, the cost function adds up how far off you were from the real number. So, a bigger mistake (like guessing 100 when the number is 5) gets a higher "cost" than a smaller mistake (guessing 11).

Now, you want to win the game, right? That means you want your cost to be as low as possible. So, you use the clues your friend gave you ("Too high!", "Too low!") and adjust your next guess to get closer to the secret number. You keep doing this, taking hints from the cost function to make smaller and smaller mistakes until you finally guess the number right!

To put the above illustration profoundly, a cost function, also known as a loss function, is a mathematical function that measures how well a machine learning model's predictions match the actual target values in a dataset. It quantifies the error between the predicted values and the true values. It helps in:

- **Performance Measurement:** They offer a clear metric to evaluate model performance.
- **Parameter Offset Calculation:** They help in determining the appropriate value to be added or subtracted from the model parameters to achieve best accuracy.
- **Balancing Bias and Variance:** They help in balancing bias and variance and help in reducing overfitting issue so as to generalize the model’s ability to predict accurately on new data.

## Some Popular Cost Functions

There are different types of cost functions for different kind of problems. Some of the most common ones are:

### For Regression Problems:

**Mean Absolute Error (MAE):**
```math
\frac{1}{n} \sum_{i=1}^n (y_i - \overline{y_i})
```

**Mean Squared Error (MSE):**

```math
\frac{1}{n} \sum_{i=1}^n (y_i - \overline{y_i})^2
```

**Root Mean Squared Error (RMSE):**

```math
\sqrt{\frac{1}{n} \sum_{i=1}^n (y_i - \overline{y_i})^2}
```

Where:  
$$n$$ = Number of samples  
$$y$$ = Expected output  
$$\overline{y}$$ = Actual output  

### For Classification Problems:

**Binary Cross-Entropy**
```math
-\frac{1}{n} \sum_{i=1}^{n}  \overline{y_{i}} * log(\overline{y_{i}}) + (1-\overline{y_{i}}) * log(1-\overline{y_{i}})
```

**Categorical Cross-Entropy**

```math
-\frac{1}{n} \sum_{i=1}^{n} \sum_{j=1}^{c} y_{ij} * log(1-\overline{y_{ij}})
```

Where:  
$$n$$ = Number of samples  
$$y$$ = Expected output  
$$\overline{y}$$ = Actual output  
$$c$$ = Number of classes

## Choosing the right Cost Function

The appropriate cost function may depend on various factors and selecting the right cost function is very crucial as a wrong cost function may result in unexpected results and the model may not be able to make the right predictions. The factors to be taken in account when selecting a cost function are:

**Type of Problem:** There are different cost functions for different types of problems. For example, RMSE is for Regression and Binary Cross-Entropy is for Classification.

**Outliers** When there are high amount of outliers, MAE may perform better than MSE or RMSE and hence, MAE is to be preferred.

**Imbalanced Dataset:** In classification, when the data of class class is more than the other class/classes, Weighted Cross-Entropy is preferred.

Sometimes it may also be advised to experiment with different cost functions and test which one gives a better output. However, this flexibility may be restricted to small scale applications as large scale applications take a lot of time to train and may consume a lot of precious time. 

## What is the role of Cost Function in Optimization?

Well, we have discussed how cost function calculates the difference between expected output and the actual output and how to pick the right cost function. But what happens after we have selected the cost function?

This is where Gradient Descents come in. The gradient descent algorithm is used to minimize the cost function and achieve the right model parameters so as to get the minimum error.

In the next article, we will dive deeper into the variants of Gradient Descents and their Python Implementation. See you there!