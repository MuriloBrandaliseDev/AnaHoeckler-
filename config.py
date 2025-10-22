import os

class Config:
    """Configuração base para a aplicação Flask"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    """Configuração para desenvolvimento"""
    DEBUG = True
    DEVELOPMENT = True

class ProductionConfig(Config):
    """Configuração para produção"""
    DEBUG = False
    DEVELOPMENT = False

class TestingConfig(Config):
    """Configuração para testes"""
    TESTING = True
    DEBUG = True

# Dicionário de configurações
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

# Configuração ativa baseada em variável de ambiente
def get_config():
    """Retorna a configuração ativa baseada na variável de ambiente FLASK_ENV"""
    env = os.environ.get('FLASK_ENV', 'development')
    return config.get(env, config['default'])
