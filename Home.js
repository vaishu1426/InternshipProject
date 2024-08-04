import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './Home.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Welcome to Our service</h1>
        <p><bold>Learn how live in modern life with saving time</bold></p>
      </header>
      <main>
        <section>
          <h2>About Us</h2>
          <p>In our company laundry is done systematically. We use the best product to remove stains on clothes. After picking up the order from the customer we divide the clothes according to the customer's needs. After the separation, we start the process by using our best products to maintain the quality of the clothes. It takes at least two to four days to complete the process as we use UV rays to dry the clothes.Then we deliver the clothes to customers on time.  We also provide discounts based on the quantity of the clothes the customer gives and we make sure to return clothes to them by handling them with good care. We make sure to give the delivery on time as much as possible.</p>
        </section>
      </main>
      <footer>
        <pre>Contact us: prbabu19721972@gmail.com 
Address: Asilmeta, Komadi,Andhra Pradesh</pre>
      </footer>
    </div>
  );
}

export default App;