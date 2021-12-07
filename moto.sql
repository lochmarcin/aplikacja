PGDMP     -    $                y            moto    14.1    14.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16395    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16405    todos    TABLE     �  CREATE TABLE public.todos (
    id integer NOT NULL,
    users integer,
    part character varying,
    indexx character varying,
    quantity character varying,
    price character varying,
    band_number character varying,
    note text,
    collect_date date,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    company character varying,
    condition character varying,
    done boolean
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �            1259    16408    todo_id_seq    SEQUENCE     �   ALTER TABLE public.todos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    16414    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying,
    lastname character varying,
    user_name character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16426    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            �          0    16405    todos 
   TABLE DATA           �   COPY public.todos (id, users, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done) FROM stdin;
    public          postgres    false    209   �       �          0    16414    users 
   TABLE DATA           C   COPY public.users (id, firstname, lastname, user_name) FROM stdin;
    public          postgres    false    211   C       �           0    0    todo_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.todo_id_seq', 24, true);
          public          postgres    false    210            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    212            �   h  x����R�0E��W� 6iB��\�Dg*K7t���Х�A>Ý�N�_>бP����N���}������tV?�Y�*�X e�b��i����#�z�smM�rx�g�OYߧ�(0���1�Ȁu�#�̲��
�=*��l�>��z��\�0$��6R�2��v�/f�[��5��`�4���}��t�b�TX���\��f�{s���U�\�8i@�`�z��r���JY�FG)���~:�,b�N=��8�OLe�u��ٙ�0��Ȩu�ߌ/��I�4�+������y'� �p�����>Z�<����往�;	(�`��S���׭�� \L�]��.�$�����_]s�-�<� �      �   P   x�3��M,J�����O�����r�l.#΀��ԣM��U�Y��`�^2��e�镘��_��S��ə�����p��qqq -�     