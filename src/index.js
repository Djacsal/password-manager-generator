import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Создаем контейнерный элемент специально для нашего приложения
const appContainer = document.createElement("div");
appContainer.id = "root"; // Присваиваем контейнеру id "root"
document.body.appendChild(appContainer); // Добавляем контейнер в body

// Создаем корень React приложения в созданном контейнере
const root = ReactDOM.createRoot(appContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
