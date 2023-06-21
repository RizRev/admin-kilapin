import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { Table,Dropdown } from 'react-bootstrap';
// import { Form } from 'react-bootstrap/form';
// import { Picker } from 'react-native';


const Order = () => {
  const handleRemoveCard = (id) => {
    setCards(cards => cards.map(card => {
      if (card.id === id) {
        return {...card, display: false};
      } else {
        return card;
      }
    }));
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setCards(cards => cards.map(card => {
        if (card.time > 0) {
          return {...card, time: card.time - 1};
        } else {
          return {...card, display: false};
        }
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
    const [cards, setCards] = useState([]);
    const [item_name, setItemName] = useState('');
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newItem, setNewItem] = useState('');
    const [gross_amount, setGross_amount] = useState('');
    const [dataPost,setData] =useState('')
    const [order_id,setOrder_id] =useState('')
    const [time,setTime] =useState('')
    const [cleaner,setCleaner] = useState('')
    const [cleaner_id,setCleaner_id] = useState('')
    const [order_acc,setOrder_Acc] = useState('')
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
      if (item_name === 'Apartment Size 15-35m2') {
        setGross_amount(107500)
      } else if (item_name === 'Apartment Size 36-70m2'){
        setGross_amount(157500)
      } else if (item_name === 'Apartment Size 71-135m2'){
        setGross_amount(207500)
      }else if (item_name === 'Apartment Size 136-200m2'){
        setGross_amount(257500)
      }else if (item_name === 'Apartment Size 201-250m2'){
        setGross_amount(307500)
      }else if (item_name === 'Apartment Size 251-300m2'){
        setGross_amount(357500)
      }else if (item_name === 'Apartment Size 301-400m2'){
        setGross_amount(407500)
      }else if (item_name === 'Apartment Size 401-500m2'){
        setGross_amount(457500)
      }else {
        setGross_amount(1007500)
      }
      // Fungsi ini akan dipanggil setiap kali nilai item_name berubah
      console.log('Nilai item_name berubah:', item_name);

    }, [item_name]);
  
    const handlePackageChange = (value) => {
    setItemName(value);
  };

    const handleEdit = async () => {
        const date = new Date();

        // Ubah zona waktu ke WIB
        const options = { timeZone: "Asia/Jakarta", year: 'numeric', month: '2-digit', day: '2-digit' };
        const str = date.toLocaleDateString('id-ID', options);
        
        // Konversi format ke dd-mm-yyyy
        const [year, month, day] = str.split('-');
        const formattedDate = `web-${newName}-${year}`;
        
        console.log("data",formattedDate,newName,newPhone,newItem,newEmail,newAddress,`${time}:00`,gross_amount); 

        const payload = {
          name: newName,
          gross_amount: gross_amount,
          customer_id: formattedDate,
          time: `${time}:00`,
          email: newEmail,
          phone: newPhone,
          address: newAddress,
          item_name,
          service: 'Booking'
        };
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };

        const response = await fetch(`http://localhost:5000/order/input`, requestOptions);
        const data = await response.json();
        // .then((data1) => {console.log(data1)})
        // const url = await (data.data.transactionRedirectUrl)
        setData(data)
        setCards([...cards, { id: data.data.order_id,name: data.data.name,address: data.data.address, time: 30*60, display: true }]);
        console.log(dataPost);
    }

    const checkOrder = async (order_id) => {
      try {
        console.log(order_id)
        const link = `http://localhost:5000/notif/status/${order_id}`
        const response = await fetch(link);
        const data = await response.json()
        console.log("message",data.message)
        return data.message
      } catch (error) {
        console.log(error)
      }

    }

    const getAllCleaner = async () => {
      try {
        const link = `http://localhost:4567/users/all-cleaner`
        const response = await fetch(link)
        const data = await response.json()
        setCleaner(data.data)
        console.log(cleaner)
      } catch (error) {
        
      }
    }

    const writeCleaner = async () => {
      try {
        const payload = {
          order_id: order_acc
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };
        const link = `http://localhost:4567/order/writecleaner/${cleaner_id}`
        const response = await fetch(link,requestOptions)
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    const handleCheckOrder = async (id) => {
      const checkResult = await checkOrder(id);
      setCards(cards => cards.map(card => {
        if (card.id === id) {
          return {...card, checkResult};
        } else {
          return card;
        }
      }));
    };

    const handleTakeOrder = async (id) => {
      setOrder_Acc(id)
    }

    const handleTakeCleaner =async (cleaner) => {
      setCleaner_id(cleaner)
    }

  return (
    
    <div>
      {cards.map(card =>
        card.display && (
          <div key={card.id} 
          style={{ backgroundColor: card.checkResult === 'sudah membayar' ? 'green' : card.checkResult === 'silahkan dibayar' ? 'yellow' : card.checkResult === 'pembayaran expired' ? 'red': 'white'}}
>
            <h2>Card ID: {card.id}</h2>
            <h4>{card.name}</h4>
            <p>{card.address}</p>
            <p>Waktu tersisa: {Math.floor(card.time / 60)}:{card.time % 60 < 10 ? `0${card.time % 60}` : card.time % 60}</p>
            <button onClick={() => handleRemoveCard(card.id)}>Hapus Orderan</button>
            <button onClick={() => handleTakeOrder(card.id)}>Dapatkan Cleaner</button>
            <button onClick={() => handleCheckOrder(card.id)}>Cek Orderan</button>
            {card.checkResult && <p>Hasil Pengecekan: {card.checkResult}</p>}
          </div>
        )
      )}
      <div>
        <label htmlFor="order_acc">Order ACC</label>
        <input type="string" style={{width:'400px'}} class="form-control" id="order_acc" value={order_acc} onChange={e => setOrder_Acc(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="cleaner_id">ID Cleaner</label>
        <input type="string" style={{width:'400px'}} class="form-control" id="cleaner_id" value={cleaner_id} onChange={e => setCleaner_id(e.target.value)}/>
      </div>
      <Button variant="primary" onClick={writeCleaner}>
        Write Cleaner
      </Button>  
      <div>
        <label htmlFor="title">Nama:</label>
        <input type="text" class="form-control" style={{width:'400px'}} id="title" value={newName} onChange={e => setNewName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" class="form-control" style={{width:'400px'}} id="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" class="form-control" style={{width:'400px'}} id="address" value={newAddress} onChange={e => setNewAddress(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="phone">Phone/WA:</label>
        <input type="number" class="form-control" style={{width:'400px'}} id="phone" value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
      </div>
      {/* <div>
        <label htmlFor="item">Item:</label>
        <input type="text" id="item" value={newItem} onChange={e => setNewItem(e.target.value)}/>
      </div> */}
      <Dropdown onSelect={handlePackageChange}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {item_name ? `${item_name}`:`Pilih Ukuran Hinian Anda`}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Apartment Size 15-35m2">Apartment Size 15 - 35m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 36-70m2">Apartment Size 36 - 70m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 71-135m2">Apartment Size 71 - 135m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 136-200m2">Apartment Size 136 - 200m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 201-250m2">Apartment Size 201 - 250m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 251-300m2">Apartment Size 251 - 300m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 301-400m2">Apartment Size 301 - 400m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size 401-500m2">Apartment Size 401 - 500m2</Dropdown.Item>
        <Dropdown.Item eventKey="Apartment Size >500m2">Apartment Size 500m2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <div>
        <label htmlFor="gross_amount">Time:</label>
        <input type="time" id="gross_amount" style={{width:'150px'}} class="form-control" value={time} onChange={e => setTime(e.target.value)}/>
      </div>
      {/* <div>
        <label htmlFor="gross_amount">Amount:</label>
        <input type="number" id="gross_amount" value={gross_amount} onChange={e => setGross_amount(e.target.value)}/>
      </div> */}
      <Button variant="primary" onClick={handleEdit}>
        Input Order
      </Button>  
      {dataPost? 
      <div>
        {dataPost.message}
        <h2>
        {dataPost.data.order_id}
        </h2>
      </div>
      :<div></div>}
      <div>
        <label htmlFor="order_id">Order ID:</label>
        <input type="number" id="order_id" value={order_id} onChange={e => setOrder_id(e.target.value)}/>
      </div>
      <Button variant="primary" onClick={checkOrder}>
        Check Order
      </Button> 
      <Button variant="primary" onClick={getAllCleaner}>
        Check Cleaner
      </Button> 
      {
        cleaner ? 
        <div>
        <Table striped bordered hover>
            <thead>
            {/* <Row> */}
        <tr>
          <th>ID</th>
          <th style={{width: '12%'}}>Photo User</th>
          <th style={{width: '50%'}}>Name</th>
          <th style={{width: '10%'}}>Phone</th>
          <th>Address</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
        {/* </Row> */}
      </thead>
      <tbody>
      {/* <Row> */}

        {cleaner.map((post) => (
          <tr key={
post.id}>
<td >{post.id}</td>
<td>
<img className="table-image"src={`${post.photo}`} style={{ width: "100px", height: "100px", objectFit: "cover" }}/>
  </td>
<td >
  <div >
  {post.name}
  </div>
</td>
<td>{post.phone}</td>
<td>{post.address}</td>
<td>
  {post.rating}
</td>
<td>
<button onClick={() => handleTakeCleaner(post.id)}>Take Cleaner</button>
<button >Delete</button>
</td>
</tr>
))}
        {/* </Row> */}
        
</tbody>
    </Table>
        </div> :
        <div>

        </div>
      }
    </div>  
  )
}

export default Order
