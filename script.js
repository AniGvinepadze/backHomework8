#! /usr/bin/env node

import fetch from "node-fetch";
import { Command } from "commander";
import fs from "fs/promises";

const program = new Command();


program
  .name("weather-cli")
  .description(" fetch the current temperature");

program
  .command("weather")
  .description("Fetch the current temp")
  .argument("<city>", "Name of the city")
  .action(async (city) => {
    const apiKey = "895284fb2d2c50a520ea537456963d9c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log(`The current temperature in ${city} is ${data.main.temp}°C.`);
    } catch (error) {
      console.log("Failed to fetch:", error.message);
    }
  });

program.parse();

const budgetProgram = new Command();

const addExpense = async (name, amount) => {
  //   const expenses = await fs.readFile("weather.json", "utf-8");
  //   const expensesData = await JSON.parse(expenses);
  //   expensesData.push({ name, amount });
  //   await fs.writeFile("weather.json", JSON.stringify(expensesData, null, 2));
  //   console.log(`Added expense: ${name} - $${amount}`);

  try {
    let expenses = [];
    try {
      const data = await fs.readFile("weather.json", "utf-8");
      expenses = JSON.parse(data);
    } catch (error) {
      console.log("there was error");
    }
    expenses.push({ name, amount });

    await fs.writeFile("weather.json", JSON.stringify(expenses, null, 2));
    console.log(`Added expense: ${name} - $${amount}`);
  } catch (error) {
    console.log("there was error with expenses");
  }
};

// addExpense("tea", 5);

const deleteExpenses = async (name) => {
    try {
      const expenseData = await fs.readFile("weather.json", "utf-8");
      const expenses = JSON.parse(expenseData); 
  
      const filteredExpenses = expenses.filter((ex) => ex.name !== name);
  
      if (filteredExpenses.length === expenses.length) {
        console.log(`Expense was not found: ${name}`);
      } else {
        await fs.writeFile("weather.json", JSON.stringify(filteredExpenses, null, 2)); 
        console.log(`Deleted expense: ${name}`);
      }
    } catch (err) {
      console.error('Error reading or writing the file:', err);
    }
  };
  




budgetProgram
.name('budget-cli')
.description('Manage your budget')

budgetProgram
.command('add')
.description('Add a new expense')
.argument('<name>', 'Name of the expense')
.argument('<amount>', 'Amount of the expense')
.action(addExpense);

budgetProgram
.command('delete')
.description('Delete an expense by name')
.argument('<name>', 'Name of the expense to delete')
.action(deleteExpenses);

budgetProgram.parse();
