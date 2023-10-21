/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Getting Started with C#: Classes, Objects, and Namespaces

Together, classes, objects, and namespaces form the fundamental building blocks of C# programs. This article offers a brief orientation to each of these.

## Introduction to Classes and Objects

Classes are the building blocks of Object-Oriented Programming, serving as blueprints or templates for creating objects. Objects, on the other hand, are instances of classes that represent real-world entities or concepts.

For example, a Car class will define the blueprint for creating car objects. The Car class may have properties like make, model, and year, as well as methods such as StartEngine() and Drive().

This is what the Car class would look like in your codebase:

\`\`\`
public class Car
{
    //Fields
    private string make;
    private string model;
    private int year;

    //A field is a variable declared within a class.



    //Properties
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }

    //A property is a class member that offers a convenient way to access, modify, or calculate the value of a private field. The get and set keywords are used to define the accessors for the property. The get accessor returns the property value, and the set accessor assigns a new value to the property



    // Class Constructor
    public Car(string make, string model, int year)
    {
			this.make = make;
			this.model = model;
			this.year = year;
    }

     //A Class Constructor is a special member method responsible for initializing the object of that class.



    // Method 1
    public void StartEngine()
    {
        	Console.WriteLine("The engine is started.");
    }

    // Method 2
    public void Drive()
    {
        	Console.WriteLine("The vehicle is driving.");
    }

    //A method is a block of code within a class that performs a specific task or action. Methods are declared within a class and are accessed by and invoked on objects created from that class. 
}
\`\`\`

Now, let's say you create two car objects: car1 and car2. These objects are instances of the Car class and represent real-world cars. Each car object will have its own set of property values.

For example, car1 may have the make "Toyota," model "Camry," and year "2012," while car2 may have the make "Honda," model "Accord," and year "2020."

This is what instantiating those two Car objects would look like in your codebase:

\`\`\`
Car car1 = new Car("Toyota", "Camry", 2012);
Car car2 = new Car("Honda", "Accord", 2020);
\`\`\`

By instantiating car objects from the Car class, you can work with each car individually, accessing their properties and invoking their methods. You can start the engine of car1 by calling the StartEngine() method on the car1 object, and similarly, you can drive car2 by invoking the Drive() method on the car2 object. Calling the Car class methods on your Car objects looks like this:

\`\`\`
car1.StartEngine();
car2.Drive();
\`\`\`

Each car object maintains its own state and behavior, allowing you to perform different operations on different cars. Meaning you can modify the properties of car1 without affecting the properties of car2, and vice versa.

## Introduction to Namespaces

Classes are held within namespaces. By organizing classes within a namespace, developers create a clear and logical grouping of related code elements.

This is what that a namespace would look like in your codebase:

\`\`\`
namespace VehicleInventory
{
		public class Car
		{
				// Car class code from above
		}

		public class Truck
		{
			// Truck class
		}

		public class Motorcycle
		{
			// Motorcycle class
		}
}
\`\`\`

Namespaces must be imported into your file with a using statement, like this:

\`\`\`
using VehicleInventory;

// Now the Car class can be used directly
Car car3 = new Car("Toyota", "Prius", 2018);

car3.StartEngine();
\`\`\`

`