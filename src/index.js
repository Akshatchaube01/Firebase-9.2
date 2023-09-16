//   import { initializeApp } from 'firebase/app'
//   import {
//   getFirestore, collection, onSnapshot,
//   addDoc, deleteDoc, doc,
//   query, where,
//   } from 'firebase/firestore'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection ,query,where,addDoc,deleteDoc,onSnapshot,orderBy,serverTimestamp,updateDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDnZcncBoowophsZl6-BOysFGn40-TD2D4",
    authDomain: "fir-9-bd540.firebaseapp.com",
    projectId: "fir-9-bd540",
    storageBucket: "fir-9-bd540.appspot.com",
    messagingSenderId: "902887776785",
    appId: "1:902887776785:web:db9af4e64d68e5f13607b0"
  };

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where('author', '==' ,'KSI'),orderBy('createdAt')) 

// realtime collection data
onSnapshot(colRef, (snapshot) => { //Change colRef to q to use query
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

//get a single document
const docRef=doc(db,'books','2iinHUZjIIsVLBaqdeJg');

// getDoc(docRef)
//   .then((doc)=>{
//     console.log(doc.data(),doc.id)
//   })


onSnapshot(docRef,(doc)=>{
    console.log(doc.data(),doc.id)
})

// Updating the document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit',(e)=>{
  e.preventDefault()
 
  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef,{
    title:'New title'
  })
  .then(()=>{
    updateForm.reset()
  })

})
