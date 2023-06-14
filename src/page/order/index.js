import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';

const Order = () => {
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newItem, setNewItem] = useState('');
    const [gross_amount, setGross_amount] = useState('');
    const [data,setData] =useState('')
    const [order_id,setOrder_id] =useState('')
    const [time,setTime] =useState('')


    const handleEdit = async () => {
        const date = new Date();

        // Ubah zona waktu ke WIB
        const options = { timeZone: "Asia/Jakarta", year: 'numeric', month: '2-digit', day: '2-digit' };
        const str = date.toLocaleDateString('id-ID', options);
        
        // Konversi format ke dd-mm-yyyy
        const [year, month, day] = str.split('-');
        const formattedDate = `web-${newName}-${year}`;
        
        console.log("data",formattedDate,newName,newPhone,newItem,newEmail,newAddress); 

        const payload = {
          name: newName,
          gross_amount: gross_amount,
          customer_id: formattedDate,
          email: newEmail,
          phone: newPhone,
          address: newAddress,
          item_name: newItem,
          service: 'Booking'
        };
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };

        const response = await fetch(`http://153.92.4.143:5000/order/input`, requestOptions);
        const data = await response.json();
        // .then((data1) => {console.log(data1)})
        // const url = await (data.data.transactionRedirectUrl)
        setData(data)
        console.log(data.data);
    }

    const checkOrder = async () => {
      try {
        console.log(order_id)
        const link = `http://153.92.4.143:5000/notif/status/${order_id}`
        const response = await fetch(link);
        const data = await response.json()
        console.log("message",data.message)
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <div>
      <div>
        <label htmlFor="title">Nama:</label>
        <input type="text" id="title" value={newName} onChange={e => setNewName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={newAddress} onChange={e => setNewAddress(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="phone">Phone/WA:</label>
        <input type="number" id="phone" value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="item">Item:</label>
        <input type="text" id="item" value={newItem} onChange={e => setNewItem(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="gross_amount">Time:</label>
        <input type="time" id="gross_amount" value={time} onChange={e => setTime(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="gross_amount">Amount:</label>
        <input type="number" id="gross_amount" value={gross_amount} onChange={e => setGross_amount(e.target.value)}/>
      </div>
      <Button variant="primary" onClick={handleEdit}>
        Input Order
      </Button>  
      {data? 
      <div>
        {data.data.transactionRedirectUrl}
        <h2>
        {data.data.data.order_id}
        </h2>
      </div>
      :<div></div>}
      <div>
        <label htmlFor="order_id">Amount:</label>
        <input type="number" id="order_id" value={order_id} onChange={e => setOrder_id(e.target.value)}/>
      </div>
      <Button variant="primary" onClick={checkOrder}>
        Check Order
      </Button> 
    </div>  
  )
}

export default Order
