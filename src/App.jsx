import { useState } from 'react'
import { useRef } from "react"
import Logo from "./assets/logo.png"


function App() {

  const [modalAtivo, setModalAtivo] = useState(false)
  const [downloadAtivo, setDowloadAtivo] = useState(false)

  const [linkInslador, setLinkInslador] = useState("")
  const [linkAtualizador, setLinkAtualizador] = useState("")
  const [linkManual, setLinkManual] = useState("")

  const [nSerie, setNSerie] = useState("")
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  const [tipo, setTipo] = useState("")
  const [versao, setVersao] = useState("")

  const anoAtual = new Date().getFullYear()
  const anoAtual2Digitos = anoAtual % 100

  const mesAtual = new Date().getMonth()

  const definirInstalador = (tipo, versao) => {

    if (tipo == "EC" && versao == "10") {
      setLinkInslador("https://tinyurl.com/InstaladorECGV6")
      setLinkAtualizador("https://tinyurl.com/AtualizadorECGV6")
      setLinkManual("https://tinyurl.com/ManualECGV6PDF")
    }

    else if (tipo == "EC" && versao == "11") {
      setLinkInslador("https://tinyurl.com/ecgv11-instalador")
      setLinkAtualizador("https://tinyurl.com/ecgv11-atualizador")
      setLinkManual("https://tinyurl.com/ManualECGV6PDF")
    }

    else if (tipo == "TE" && versao == "10") {
      setLinkInslador("https://tinyurl.com/InstaladorErgo13")
      setLinkAtualizador("https://tinyurl.com/AtualizadorErgo13")
      setLinkManual("https://tinyurl.com/ManualErgo13PDF")
      console.log(linkInslador)
    }

    else if (tipo == "TC" && versao == "10") {
      setLinkInslador("https://tinyurl.com/InstaladorErgoMET13")
      setLinkAtualizador("https://tinyurl.com/AtualizadorErgoMET13")
      setLinkManual("https://tinyurl.com/ManualErgoMET13PDF")
    }

    else if (tipo == "TP" && versao == "10") {
      setLinkInslador("https://tinyurl.com/InstaladorErgo13CP")
      setLinkAtualizador("https://tinyurl.com/AtualizadorErgo13CP")
      setLinkManual("https://tinyurl.com/ManualErgo13PDF")
    }

  }


  const EnviarForm = (e) => {
    e.preventDefault()

    if (nSerie.length < 11) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }

    const tipoLocal = nSerie.slice(0, 2).toUpperCase()

    if (
      tipoLocal !== "EC" &&
      tipoLocal !== "TE" &&
      tipoLocal !== "TC" &&
      tipoLocal !== "TP"
    ) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }

    if (
      (tipoLocal == "EC" && nSerie.slice(2, 4) !== "10" && nSerie.slice(2, 4) !== "11")
      ||
      ((tipoLocal == "TE" || tipoLocal == "TC" || tipoLocal == "TP") && nSerie.slice(2, 4) !== "10")
    ) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }

    const versaoLocal = nSerie.slice(2, 4)


    const aa = nSerie.slice(4, 6)
    const anoFabricacao = Number(aa)


    if (
      isNaN(anoFabricacao) ||
      anoFabricacao < 7 ||
      anoFabricacao > anoAtual2Digitos
    ) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }

    const mm = Number(nSerie.slice(6, 8))

    if (
      isNaN(mm) ||
      mm < 1 ||
      mm > 12 ||
      (anoFabricacao === anoAtual2Digitos && mm > mesAtual)
    ) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }


    const nnn = Number(nSerie.slice(8, 11))

    if (
      isNaN(nnn) ||
      nnn < 1 ||
      nnn > 999
    ) {
      setError("Número de série inválido!")
      setDowloadAtivo(false)
      inputRef.current?.focus()
      return
    }


    setTipo(tipoLocal)
    setVersao(versaoLocal)

    definirInstalador(tipoLocal, versaoLocal)
    setDowloadAtivo(true)
  }

  return (
    <>
      <header>
        <div className="content-header">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="titulo-header">
            <h2>Validador de Número de Série</h2>
          </div>
        </div>
      </header>

      <div className="content">
        <div className="parte-form">

          <form action="" onSubmit={EnviarForm} noValidate>
            <div className="input-principal">
              <label htmlFor="nserie">Número de Série:</label>

              <input
                ref={inputRef}
                value={nSerie}
                type="text"
                id='nserie'
                placeholder='TTvvaammnnn'
                minLength={11} maxLength={11}
                onChange={(e) => {
                  setNSerie(e.target.value)
                  setDowloadAtivo(false)
                  setError("")
                }} />

              {error && (
                <p style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}>
                  {error}
                </p>
              )}

            </div>
            <div className="botao">
              <button type='submit' id='verifica'>Verifica</button>
            </div>

          </form>

          <div className="onde" onClick={() => {
            setModalAtivo(true)
          }}>
            <div className="img-onde">
              <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="0" y="0" version="1.1" width="40px" height="40px" viewBox="0 0 40 40">
                <circle fill="#FFFFFF" cx="19.889" cy="19.912" r="17.1" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3.841" />
                <path d="M9.922 15.888h5.12s.457-3.017 5.167-3.017c3.613 0 4.345 1.326 4.345 2.057 0 1.875-8.186 4.618-8.186 8.778h5.487s.228-1.51 1.509-2.331c1.28-.823 6.399-3.43 6.399-6.172 0-3.247-3.291-6.31-9.875-6.31-6.903 0-9.966 4.846-9.966 6.995z" fill="CurrentColor" />
                <ellipse fill="CurrentColor" cx="19.272" cy="28.438" rx="2.995" ry="2.492" />
              </svg>
            </div>
            <p>Onde acho meu número de série?</p>
          </div>
        </div>

        <div className={`modal ${modalAtivo ? "ativo" : ""}`} onClick={() => {
          setModalAtivo(false)
        }}>
          <div className="content-modal">
            <div className="close" onClick={() => {
              setModalAtivo(false)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="CurrentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
            </div>
            <p>
              O número de série pode ser encontrado em uma etiqueta na parte inferior do aparelho.
            </p>
          </div>
        </div>

        <div className={`downloads ${downloadAtivo ? "ativo" : ""}`}>
          <h4>Instaladores {tipo == "EC" ? "ECGV6" : tipo == "TE" ? "ERGO13" : tipo == "TC" ? "ERGOMET13" : "ERGO13CP"}</h4>
          <div className="instalador">
            <a href={linkInslador} >
              Baixar instalador
            </a>
          </div>

          <div className="atualizador">
            <a href={linkAtualizador}>
              Baixar Atualizador
            </a>
          </div>

          <div className="manual">
            <a href={linkManual}>
              Baixar Manual
            </a>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
