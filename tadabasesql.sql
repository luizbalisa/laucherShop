DROP DATABASE IF EXISTS shoop
CREATE DATABASE shoop

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "user_id" int UNIQUE,
  "name" varchar,
  "description" text,
  "price" int,
  "olg_price" int,
  "status" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);
INSERT INTO categories(name) VALUES ('AutoMóveis')

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "product_id" int UNIQUE
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text  NOT NULL,
  "cpf_cnpj" int UNIQUE NOT NULL,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES  "users" ("id")

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

