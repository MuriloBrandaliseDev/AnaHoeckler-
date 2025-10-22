#!/usr/bin/env python3
"""
Arquivo de inicialização simples para o site da Estética da Ana Hoeckler
"""

from app import app

if __name__ == '__main__':
    print("🚀 Iniciando o site da Estética da Ana Hoeckler...")
    print("📱 Acesse: http://localhost:5000")
    print("🛑 Pressione Ctrl+C para parar o servidor")
    print("-" * 50)
    
    try:
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n👋 Servidor parado com sucesso!")
    except Exception as e:
        print(f"❌ Erro ao iniciar o servidor: {e}")
