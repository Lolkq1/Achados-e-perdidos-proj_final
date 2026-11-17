CREATE DATABASE projeto_final;
use projeto_final;
CREATE TABLE local (id INT PRIMARY KEY AUTO_INCREMENT, bloco VARCHAR(255) NOT NULL, nome VARCHAR(255) NOT NULL);
CREATE TABLE categoria (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(30) NOT NULL);
CREATE TABLE objeto (id INT PRIMARY KEY AUTO_INCREMENT, descricao TEXT, data DATE, situacao ENUM("Perdido", "Devolvido"), id_local INT, id_categoria INT, FOREIGN KEY (id_local) REFERENCES local (id), FOREIGN KEY (id_categoria) REFERENCES categoria (id));
CREATE TABLE etiqueta (id INT PRIMARY KEY AUTO_INCREMENT, marca VARCHAR(30), cor VARCHAR(15), material VARCHAR(20));
CREATE TABLE usuario (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, tipo ENUM ("comum", "entregador", "administrador") NOT NULL DEFAULT "comum", email VARCHAR(255) NOT NULL UNIQUE, senha VARCHAR(255) NOT NULL);
CREATE TABLE solicitacao(id INT PRIMARY KEY AUTO_INCREMENT, status ENUM ("Sob análise", "Rejeitada", "Aprovada") NOT NULL DEFAULT "Sob análise", turno ENUM ("Matutino", "Vespertino"), data_entrega DATE, id_objeto INT, id_usuario INT NOT NULL, responsavel_entrega INT, descricao_solicitante TEXT NOT NULL, FOREIGN KEY (responsavel_entrega) REFERENCES usuario (id), FOREIGN KEY(id_usuario) REFERENCES usuario (id), FOREIGN KEY(id_objeto) REFERENCES objeto (id));
CREATE TABLE etiquetaObjeto(id INT PRIMARY KEY AUTO_INCREMENT, id_etiqueta INT NOT NULL, id_objeto INT NOT NULL, FOREIGN KEY(id_etiqueta) REFERENCES etiqueta (id), FOREIGN KEY(id_objeto) REFERENCES objeto (id));

insert into local values ("info", "sala B-123"), ("info", "sala D-123"), ("edificacoes", "sala B-321"), ("estradas", "sala C-123"), ("quimica", "sala A-123");
insert into categoria values ("escolar"), ("eletrônicos"), ("chaves"), ("documentos"), ("roupas");
insert into objeto values ("lapis quebrado sem borracha", "Perdido", 1, 1), ("celular sem botao de volume todo quebrado tela rachada", "Perdido", 2, 2),
("chave com chaveiro do homem aranha", "Perdido", 3, 3), ("carteira de identidade de um tal cristiano ronaldo dos santos aveiro", "Perdido", 4, 4), ("camisa do santos fc", "Perdido", 5, 5);
insert into etiqueta values ("lenovo", null, null), ("avon", null, null), ("nike", null, null), (null, "azul", null), (null, null, "metalico");
insert into usuario values ("neymar", "entregador", "njss11@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"), ("vitor", "comum", "vgss5@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"),
("luiz", "comum", "ldss10@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"), ("rodrigo", "comum", "rodrigo@gmail.com", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK"),
("cristiano ronaldo", "entregador", "crsa7@aluno.ifal.edu.br", "$2b$10$WWO.5zDHL3nKvi4FjK1v0OWM9W5kuB0hz6iGq5JAdWz8Wc5iU0eLK");
insert into solicitacao ("Rejeitada", null, null, 1, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver."), "Sob análise", null, null, 2, null, "acho que foi meu celular perdi ontem dia 33/12. favor devolver."),
("Sob análise", null, null, 3, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver."), ("Sob análise", null, null, 4, null, "acho que foi meu celular perdi ontem dia 32/12. favor devolver."),
("Sob análise", null, null, 5, null, "acho que foi meu celular perdi ontem dia 33/12. favor devolver.")