import axios from 'axios';

function AtualizarDadosBtn() {
  const handleClick = async () => {
    try {
      await axios.post('http://localhost:8080/api/atualizar-dados');
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar os dados!');
    }
  };

  return (
    <button onClick={handleClick} style={{ position: 'fixed', top: 10, right: 10 }}>
      Atualizar Dados
    </button>
  );
}

export default AtualizarDadosBtn;