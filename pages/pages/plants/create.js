import Link from 'next/link'
import Head from 'next/head'
import { useState } from "react";

export default function CreatePlant() {
    const [name, setName] = useState("")
    const [species, setSpecies] = useState("")
    const [watering_instructions, setWateringInstructions] = useState("")
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [message, setMessage] = useState("")


    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const createNewPlant = async event => {
        event.preventDefault()
        const body = new FormData();
        body.append('photo', image)
        body.append('name', name)
        body.append('species', species)
        body.append('watering_instructions', watering_instructions)
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_ROOT_URL + 'api/plant', {
            method: 'POST',
            body
        })

        const result = await res.json()
        setImage('')
        setCreateObjectURL('')
        setName('')
        setSpecies('')
        setWateringInstructions('')
        setMessage(result.message)
    }


    return (
        <div className="container">
            <Head>
                <title>Add New Plant Entry</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1 className="title">Plant Tracker</h1>
                <div>
                    <Link href="/"><a>Go to homepage</a></Link>
                </div>
                <div className="grid">
                    <form onSubmit={createNewPlant}>
                        <div>{message}</div>
                        <div>
                            <label htmlFor="name">Plant Name</label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}}  id="name" name="name" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="species">Plant Species</label>
                            <input value={species} onChange={(e)=>{setSpecies(e.target.value)}}  id="species" name="species" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="watering_instructions">Watering Instructions</label>
                            <textarea value={watering_instructions} onChange={(e)=>{setWateringInstructions(e.target.value)}} id="watering_instructions" name="watering_instructions" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="photo">Photo</label>
                            <input id="photo" name="photo" type="file" required onChange={uploadToClient} />
                            <div>
                                <img height="auto" width="400" src={createObjectURL} />
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main>

            <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 100%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

            <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        label {
            margin-right: 50px;
            display: block;
        }
      `}</style>
        </div>
    )
}
