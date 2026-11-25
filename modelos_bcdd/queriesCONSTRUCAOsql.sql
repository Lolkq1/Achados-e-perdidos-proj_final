CREATE DATABASE projeto_final;
use projeto_final;
CREATE TABLE local (id INT PRIMARY KEY AUTO_INCREMENT, bloco VARCHAR(255) NOT NULL, nome VARCHAR(255) NOT NULL);
CREATE TABLE categoria (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(30) NOT NULL);
CREATE TABLE objeto (id INT PRIMARY KEY AUTO_INCREMENT, descricao TEXT, data DATE, situacao ENUM("Perdido", "Devolvido") NOT NULL DEFAULT "Perdido", turno ENUM("Matutino", "Vespertino") NOT NULL DEFAULT "Matutino", id_local INT NOT NULL, id_categoria INT NOT NULL, FOREIGN KEY (id_local) REFERENCES local (id), FOREIGN KEY (id_categoria) REFERENCES categoria (id));
CREATE TABLE etiqueta (id INT PRIMARY KEY AUTO_INCREMENT, marca VARCHAR(30), cor VARCHAR(15), material VARCHAR(20));
CREATE TABLE usuario (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, tipo ENUM ("comum", "entregador", "administrador") NOT NULL DEFAULT "comum", email VARCHAR(255) NOT NULL UNIQUE, senha VARCHAR(255) NOT NULL);
CREATE TABLE solicitacao(id INT PRIMARY KEY AUTO_INCREMENT, status ENUM ("Sob análise", "Rejeitada", "Aprovada") NOT NULL DEFAULT "Sob análise", data_perdido DATE NOT NULL, turno ENUM ("Matutino", "Vespertino"), data_entrega DATE, id_local INT, id_objeto INT, id_usuario INT NOT NULL, responsavel_entrega INT, descricao_solicitante TEXT NOT NULL, FOREIGN KEY (responsavel_entrega) REFERENCES usuario (id), FOREIGN KEY(id_usuario) REFERENCES usuario (id), FOREIGN KEY(id_objeto) REFERENCES objeto (id), FOREIGN KEY (id_local) REFERENCES local (id));
CREATE TABLE etiquetaObjeto(id INT PRIMARY KEY AUTO_INCREMENT, id_etiqueta INT NOT NULL, id_objeto INT NOT NULL, FOREIGN KEY(id_etiqueta) REFERENCES etiqueta (id), FOREIGN KEY(id_objeto) REFERENCES objeto (id));

insert into local (bloco, nome) values ("info", "sala B-123"), ("info", "sala D-123"), ("edificacoes", "sala B-321"), ("estradas", "sala C-123"), ("quimica", "sala A-123");
insert into categoria (nome) values ("escolar"), ("eletrônicos"), ("chaves"), ("documentos"), ("roupas");
insert into objeto (descricao, situacao, id_local, id_categoria) values ("lapis quebrado sem borracha", "Perdido", 1, 1), ("celular sem botao de volume todo quebrado tela rachada", "Perdido", 2, 2),
("chave com chaveiro do homem aranha", "Perdido", 3, 3), ("carteira de identidade de um tal cristiano ronaldo dos santos aveiro", "Perdido", 4, 4), ("camisa do santos fc", "Perdido", 5, 5);
insert into etiqueta (marca, cor, material) values ("lenovo", null, null), ("avon", null, null), ("nike", null, null), (null, "azul", null), (null, null, "metalico");
insert into usuario (nome, tipo, email, senha) values ("neymar", "entregador", "njss11@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"), ("vitor", "comum", "vgss5@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"),
("luiz", "comum", "ldss10@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"), ("rodrigo", "comum", "rodrigo@gmail.com", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"),
("cristiano ronaldo", "entregador", "crsa7@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"), ("admin", "administrador", "admin@ifal.edu.br", "$2b$10$NjmDOB8vPvEbjiIWn4u3auTbDzZzMOu1Opi.vDfxMC5pwNKepgk/C");
insert into solicitacao (status, turno, id_objeto, data_entrega, id_usuario, responsavel_entrega, descricao_solicitante, data_perdido, id_local) values
("Rejeitada", "Matutino",null, null, 1, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver.", 'NOW()', 1), 
("Sob análise", "Vespertino", null, null, 2, null, "acho que foi meu celular perdi ontem dia 33/12. favor devolver.", 'NOW()', 2),
("Sob análise", "Matutino", null, null, 3, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver.", 'NOW()', 3), 
("Sob análise", "Vespertino", null, null, 4, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver.", 'NOW()', 4),
("Sob análise", "Matutino", null, null, 5, null, "acho que foi meu celular perdi ontem dia 33/12. favor devolver.", 'NOW()', 5);
insert into etiquetaObjeto (id_etiqueta, id_objeto) values (1,1), (4,1), (5,1), (1,2), (4,2), (5,2), (1,3), (4,3), (5,3), (1,4), (4,4), (5,4), (1,5), (4,5), (5,5);