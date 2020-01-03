// Interface responsável por definir qual o tipo de dado que cada propriedade do post deve ter

export interface Post {
  id: String;
  title: String;
  content: String;
  imagePath: String;
  creator: String;
}
