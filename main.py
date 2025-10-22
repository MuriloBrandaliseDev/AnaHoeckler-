from flask import Flask, render_template
from config import get_config

def create_app():
    """Factory function para criar a aplicação Flask"""
    app = Flask(__name__)
    
    # Carregar configuração
    app.config.from_object(get_config())
    
    # Registrar rotas
    @app.route('/')
    def home():
        return render_template('index.html')
    
    @app.route('/sobre')
    def sobre():
        return render_template('sobre.html')
    
    @app.route('/servicos')
    def servicos():
        return render_template('servicos.html')
    
    @app.route('/contato')
    def contato():
        return render_template('contato.html')
    
    return app

# Criar instância da aplicação
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
