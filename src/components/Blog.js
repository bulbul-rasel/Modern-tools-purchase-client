import React from 'react';

const Blog = () => {
    return (
        <div className='mt-20 mx-20'>
            <h1 className='text-4xl text-primary font-bold text-center'>Question & Answer</h1>
            <div className='my-5'>
                <h2 className='text-bold text-2xl text-secondary my-2'>Q1.  How will you improve the performance of a React Application?</h2>
                <p> How will you improve the performance of a React Application?</p>
                <p>Memoizing React components to prevent unnecessary re-renders.</p>
                <p>Windowing or list virtualization in React.</p>
                <p>Do not use bigger size for lazy loading images in React.</p>
            </div>
            <div className='my-5'>
                <h2 className='text-bold text-2xl text-secondary my-2'>Q2.  What are the different ways to manage a state in a React application?</h2>
                <p>Every React component has a built-in state. This state is an object which stores the property values that belong to a component. State is able to keep data from different components in-sync because each state update re-renders all relevant components.</p>
                <p>There are several other ways to manage states in React</p>
                <p>1. Hooks</p>
                <p>2. React Context API</p>
                <p>3. Apollo Link State</p>
            </div>
            <div className='my-5'>
                <h2 className='text-bold text-2xl text-secondary my-2'>Q3. How does prototypical inheritance work?</h2>
                <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
            </div>
            <div className='my-5'>
                <h2 className='text-bold text-2xl text-secondary my-2'>Q4. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                <p>Of course, not always I have access to the $product id and name  so i am  also required to understand the case scenario and see if i can get that $product object in another way.

                    For example, I know the $product_id as well as $product.name. In this case, i have to find a way to get the $product object from $product.name, And Then i can found the product </p>
            </div>
            <div className='my-5'>
                <h2 className='text-bold text-2xl text-secondary my-2'>Q5. What is a unit test? Why should write unit tests?</h2>
                <p>Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently, Unit tests are typically automated tests written and run by software developers to ensure that a section of an application meets its design and behaves as intended.</p>
            </div>
        </div>
    );
};

export default Blog;