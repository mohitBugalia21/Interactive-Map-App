# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# React Leaflet Map App

A modern, interactive map application built with **React**, **React-Leaflet**, and **Leaflet**. This project features a beautiful dark-themed map, custom markers, marker clustering, a draggable and stylish search bar, and a dynamic footer. Designed and developed by Mohit Bugalia.

---

## ✨ Features

- **Dark Themed Map** using CartoDB tiles
- **Custom Markers** with popups for Paris landmarks
- **Marker Clustering** for better visualization
- **Draggable, Decorative Search Bar** (Leaflet GeoSearch)
- **Responsive, Stylish Footer** that appears on load or when the mouse is near the bottom
- **Mobile-friendly** and fully responsive design

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## 🗺️ Project Structure

```
src/
  ├── App.js                # Main React component
  ├── DraggableSearchBar.js # Draggable search bar logic
  ├── style.css             # Custom styles
  ├── img/
  │    └── placeholder.png  # Custom marker icon
  └── index.js              # Entry point
```

---

## 🛠️ Main Dependencies

- [React](https://reactjs.org/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- [react-leaflet-cluster](https://www.npmjs.com/package/react-leaflet-cluster)
- [leaflet-geosearch](https://github.com/smeijer/leaflet-geosearch)

---

## ⚙️ Customization

- **Markers:**  
  Edit the `markers` array in `App.js` to add or change locations and popups.

- **Map Theme:**  
  The dark map uses CartoDB's `dark_all` tiles. You can change the `TileLayer` URL for a different look.

- **Search Bar:**  
  The search bar is draggable and styled for a modern, glassy look.  
  You can further customize its appearance in `style.css`.

- **Footer:**  
  The footer appears for a few seconds on load or when the mouse is near the bottom, and hides on map interaction.  
  Edit the text or style in `App.js` and `style.css`.

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🙏 Credits

- Map tiles by [CartoDB](https://carto.com/)
- Marker clustering by [react-leaflet-cluster](https://www.npmjs.com/package/react-leaflet-cluster)
- Search powered by [leaflet-geosearch](https://github.com/smeijer/leaflet-geosearch)

---

## 🧑‍💻 Author

**Mohit Bugalia**

---

## 📄 License

This project is for educational/demo purposes.  
For commercial use, please check the licenses of all dependencies.

---
