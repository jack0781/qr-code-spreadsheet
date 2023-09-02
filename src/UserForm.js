import React, {useState, useRef} from 'react'
import axios from 'axios'
import QRCode from 'qrcode.react'

function UserForm() {
  // form states
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [surname, setSurname] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [qrCodeData, setQRCodeData] = useState('')
  // retrived data state
  const qrCodeRef = useRef(null)

  // submit event
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, surname, age, gender, address, mobile)

    // our object to pass
    const data = {
      Name: name,
      Surname: surname,
      Age: age,
      Gender: gender,
      Address: address,
      MobileNo: mobile,
    }
    axios
      .post(
        'https://sheet.best/api/sheets/3d7c7969-9b37-4262-b84b-3b8a117f947c',
        data,
      )
      .then((response) => {
        const webAppURL = 'https://knwgzr.csb.app/' // Replace with your web app URL
        const qrData = JSON.stringify(response.data)
        const userInfoURL = `${webAppURL}information?user=${encodeURIComponent(
          qrData,
        )}`
        setQRCodeData(userInfoURL)
        setName('')
        setAge('')
        setSurname('')
        setGender('')
        setAddress('')
        setMobile('')
      })
  }

  const downloadQRCodeAsImage = () => {
    const canvasElement = qrCodeRef.current.querySelector('canvas')

    if (canvasElement) {
      // Convert the canvas to a data URL (PNG format)
      const dataURL = canvasElement.toDataURL('image/png')

      // Create an anchor element to trigger the download
      const downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = 'qrcode.png' // Set the filename
      downloadLink.click()
    }
  }

  return (
    <div className="container">
      <br></br>
      <h1>Save Form Data in Google Sheets using React</h1>
      <br></br>
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br></br>
        <label>Surname</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your surname"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
        <br></br>
        <label>Age</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your age"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <br></br>
        <label>Gender</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        />
        <br></br>
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <br></br>
        <label>MobileNo</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your mobile num"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <br></br>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {qrCodeData && (
        <div>
          <h2>QR Code</h2>
          <div ref={qrCodeRef}>
            <QRCode value={qrCodeData} />
            <button onClick={downloadQRCodeAsImage}>Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserForm
