import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado'

import { IoIosAddCircle, IoIosTrash, IoMdBuild } from "react-icons/io";


class App extends Component {

  constructor() {
    super();
    this.state = {
      listaCliente: [],
      id: '',
      cpf: '',
      nome: '',
      email: '',
      telefone: '',
      senha: '',
      usuario: '',
      cep: '',
      bairro: '',
      logradouro: '',
      cidade: '',
      uf: '',
    };

    this.enviaForm = this.enviaForm.bind(this);
    this.editaForm = this.editaForm.bind(this);
    this.setcpf = this.setcpf.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setTelefone = this.setTelefone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("didMount");
    this.obterTodos();
  }

  obterTodos() {
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
      data: JSON.stringify({
        cpf: this.state.cpf,
        nome: this.state.nome,
        telefone: this.state.telefone,
        email: this.state.email,
        usuario: this.state.senha,
        senha: this.state.senha
      }),
      success: function (resposta) {
        console.log("ENVIADO COM SUCESSO!");
      },
      error: function (resposta) {
        console.log("ERRO NO ENVIO");
      },
    })
  }

  excluirForm(id) {
    $.ajax({
      url: `http://localhost:8080/cliente/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf8'
      },
      type: 'delete',
      success: resposta => {
        this.obterTodos();
      }
    })
  }

  editaForm(id) {
    //CARREGAR OS DADOS DO ID NA TELA
    $.ajax({
      url: `http://localhost:8080/cliente/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf8'
      },
      success: resposta => {
        console.log(resposta);
        this.setState(resposta);
      }
    });
  }


  preencherEnderecoComCep() {

    const cep = this.state.cep;

    $.ajax({
      url: `http://viacep.com.br/ws/${cep}/json/`,
      dataType: 'jsonp',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'charset': 'utf8'
      },
      type: 'GET',
      success: (resposta) => {
        this.setState(resposta);
      },
      error: function (resposta) {
        console.log("ERRO NO ENVIO");
      },
    });
  }

  enviaEdicao(evento) {

    evento.preventDefault();
    $.ajax({
      url: `http://localhost:8080/cliente/${this.state.id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf8'
      },
      type: 'PUT',
      data: JSON.stringify({
        cpf: this.state.cpf,
        nome: this.state.nome,
        telefone: this.state.telefone,
        email: this.state.email,
        usuario: this.state.usuario,
        senha: this.state.senha,
        id: this.state.id,
      }),
      success: (resposta) => {
        console.log("ALTERADO COM SUCESSO");
        this.obterTodos();
      },
      error: function (resposta) {
        console.log("ERRO NO ENVIO");
      },
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

  handleChange(evento) {
    this.setState({ [evento.target.name]: evento.target.value })
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
                <InputCustomizado id="cpf" type="text" name="cpf" value={this.state.cpf}
                  onChange={this.setcpf} label="CPF" />
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome}
                  onChange={this.setNome} label="Nome" />
                <InputCustomizado id="telefone" type="text" name="telefone" value={this.state.telefone}
                  onChange={this.setTelefone} label="Telefone" />
                <InputCustomizado id="email" type="email" name="email" value={this.state.email}
                  onChange={this.setEmail} label="Email" />
                <InputCustomizado id="usuario" type="text" name="usuario" value={this.state.usuario}
                  onChange={this.setUsuario} label="Usuário" />
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha}
                  onChange={this.setSenha} label="Senha" />
                <InputCustomizado id="cep" type="text" name="cep" value={this.state.cep}
                  onChange={this.handleChange} onBlur={() => this.preencherEnderecoComCep()} label="Cep" />
                <InputCustomizado id="logradouro" type="text" name="logradouro"
                  value={this.state.logradouro} onChange={this.handleChange}
                  label="Logradouro" />
                <InputCustomizado id="bairro" type="text" name="bairro" value={this.state.bairro}
                  onChange={this.handleChange} label="Bairro" />
                <InputCustomizado id="cidade" type="text" name="cidade" value={this.state.cidade}
                  onChange={this.handleChange} label="Cidade" />
                <InputCustomizado id="UF" type="text" name="uf" value={this.state.uf}
                  onChange={this.handleChange} label="UF" />
                <label></label>
                <div>
                  <button type="submit" className="pure-button pure-button-primary">SALVAR</button>
                </div>
                <br />
                <br />
                <div>
                  <button type="button" className="pure-button pure-button-primary"
                    onClick={e => this.enviaEdicao(e)}>EDITAR
                                    </button>
                </div>
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
                    <th>Cep</th>
                    <th>Logradouro</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>UF</th>
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
                          <td>{cliente.telefone}
                            <button name='add' onClick={() => this.addTelefonForm(cliente.id)}>
                              <IoIosAddCircle /></button>
                          </td>
                          <td>{cliente.email}</td>
                          <td>{cliente.usuario}</td>
                          <td>{cliente.senha}</td>
                          <td>{cliente.cep}</td>
                          <td>{cliente.logradouro}</td>
                          <td>{cliente.bairro}</td>
                          <td>{cliente.cidade}</td>
                          <td>{cliente.uf}</td>
                          <td>{cliente.acao}
                            <button name='excluir' onClick={() => this.excluirForm(cliente.id)}>
                              <IoIosTrash /></button>
                            <button name='editar' onClick={() => this.editaForm(cliente.id)}>
                              <IoMdBuild /></button>
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