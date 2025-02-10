## TodoApp

# Beskrivning

Detta projekt är en frontend-applikation för en att-göra-lista byggd med React och TypeScript. Applikationen hämtar, lägger till och hanterar uppgifter via en REST API.

# Funktioner

- Visa en lista över att-göra-punkter

- Lägga till nya uppgifter

- Uppdatera uppgifter

- Sortera uppgifter så att nyaste syns först

- Responsiv design

# Teknologier

- React (Vite)

- TypeScript

- CSS Modules för styling

- REST API för datakommunikation

- Hooks för datahantering (useState, useEffect)

# Installation

1. Klona repot

git clone https://github.com/ditt-repo/todoapp.git
cd todoapp

2. Installera beroenden

npm install

3. Starta utvecklingsservern

npm run dev

Applikationen kommer att köras på http://localhost: och den port som Vite väljer.

# API-konfiguration

Applikationen hämtar att-göra-uppgifter från http://localhost:5036/todoitems. Se till att backend-servern är igång och att API:et fungerar för att kunna hämta och skicka data.