import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado'

import { IoIosTrash } from "react-icons/io";
import { IoMdBuild } from "react-icons/io";



class App extends Component {

  constructor() {
    super();
    this.state = { listaCliente: [], id: '', cpf: '', nome: '', email: '', telefone: '', senha: '', usuario: '' };

    this.enviaForm = this.enviaForm.bind(this);
    this.setcpf = this.setcpf.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setTelefone = this.setTelefone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    console.log("didMount");
    $.ajax({
      url: "http://localhost:8080/cliente",
      dataType: 'json',
      success: function (resposta) {
        this.setState({ listaCliente: resposta });
      }.bind(this)
    }
    );
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: "http://localhost:8080/cliente",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf8'
      },
      type: 'post',
      data: JSON.stringify({ cpf: this.state.cpf, nome: this.state.nome, telefone: this.state.telefone, email: this.state.email, usuario: this.state.senha, senha: this.state.senha }),
      success: function (resposta) {
        console.log("ENVIADO COM SUCESSO!");
      },
      error: function (resposta) {
        console.log("ERRO NO ENVIO");
      },
    })
  }
  excluirForm(id) {
    console.log(id);
    $.ajax({
      url: `http://localhost:8080/cliente/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf8'
      },
      type: 'delete'
    })
  }


setcpf(evento) {
  this.setState({ cpf: evento.target.value })
}

setNome(evento) {
  this.setState({ nome: evento.target.value })
}
setTelefone(evento) {
  this.setState({ telefone: evento.target.value })
}
setEmail(evento) {
  this.setState({ email: evento.target.value })
}
setUsuario(evento) {
  this.setState({ usuario: evento.target.value })
}
setSenha(evento) {
  this.setState({ senha: evento.target.value })
}

render() {
  console.log("render");
  return (
    <div id="layout">
      <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
      </a>

      <div id="menu">
        <div className="pure-menu">
          <a className="pure-menu-heading" href="#">Company</a>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Cliente</a></li>
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Lista Cliente</a></li>
          </ul>
        </div>
      </div>

      <div id="main">
        <div className="header">
          <h1>CLIENTES</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
              <InputCustomizado id="cpf" type="text" name="cpf" value={this.state.cpf} onChange={this.setcpf} label="CPF" />
              <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
              <InputCustomizado id="telefone" type="text" name="telefone" value={this.state.telefone} onChange={this.setTelefone} label="Telefone" />
              <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
              <InputCustomizado id="usuario" type="text" name="usuario" value={this.state.usuario} onChange={this.setUsuario} label="Usuário" />
              <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
              <label></label>
              <button type="submit" className="pure-button pure-button-primary">Gravar</button>
            </form>

          </div>
          <div>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Usuario</th>
                  <th>Senha</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.listaCliente.map((cliente) => {
                    
                    return (
                      <tr key={cliente.id}>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.usuario}</td>
                        <td>{cliente.senha}</td>
                        <td>{cliente.acao}
                          <button name='excluir' onClick={() => this.excluirForm(cliente.id)}><IoIosTrash /></button>
                          
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default App;