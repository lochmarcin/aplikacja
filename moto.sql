PGDMP                 	         z            moto    14.1    14.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    done boolean,
    "whoDone" character varying
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
            public          postgres    false    209            �            1259    16414    users    TABLE     v  CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying,
    lastname character varying,
    username character varying,
    "isAdmin" boolean,
    "isEditor" boolean,
    "isViewer" boolean,
    "accessToken" character varying,
    "refreshToken" character varying,
    password character varying,
    "createdAt" date,
    "updatedAt" date
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
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone") FROM stdin;
    public          postgres    false    209          �          0    16414    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   �       �           0    0    todo_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.todo_id_seq', 66, true);
          public          postgres    false    210            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    212            �   w  x��XKr�8]ç` ��.���NJ�2Zb,E��ҧT�2�������݌�5~�"��q�*���x��P�2�\�nN��b��	�J�[B'D�:�ט����@w%t9�N��F�$�i�o���#
+�x�o_�O)��&�_�|~�Ò�$�S�7�j������%b������hv��~��G���u�����`ٓ�[Y00"�0X�4~]���~�Ck�Ꜥ�Nj���9y�c'-ڮ6�o�`q������ �yzd�=yz,����bW>��#��(^�
��趠�	��&*�_�g��(��������oM�Z��K��Su��k�g�3Ǥ#��cv�v�� q#8b��O��R��]J�4fZ&��;�Lƭ)���q����U�E�������o��c�O��7w����)w&C��Çx$�g���}�K�qh2�N�T/f\$��P<���v��1������ �Y��h���i�s�[����� e��}5p�c;�s���YE��j�V*�����x��[��x���g�b����*
��d�I�Y]$S�g\��,�L���/��8R����\��,�ǰ��K�$�\>���6�D��Rz�r��n�U��l£���@�ILM�o����\�>��-}�;cZu5��~���Q(��o��byW���P��no�ζE��c9�\����v�#7T��k�%�M
&<�X:!����6��f `�%�xEX�[��{%V'�g�X�
k��!�x�ƢE��	��z���|�����	�2��Ӹ-�#����ׇˇ
�
�b^C���U��x���V�3-���e�������/0~4_I�\��	�ě���3o.0����Ϩ�hny���!�~yG��MП�g��1��M��|�ӛ|z��D����^�9mJ�R2����5Y9�+|�o2:G�k��P^!��g�~�&0dcie��3�OC��g(O�}�|��@�n�08��3����tT�$�e�{h�l3f���v-��A�#%|�n<�W����C�-l��?wd�}�#i��sgc�~>o����Ƽ�A&�,>'<�G%��~8`�����?Za�w~�����°B�(�?�I�������{?
      �   ;  x����n�0�����cL�2�B�ͥ$�Tr�\L��fޭ�5�U�SM;�J^���&}:Hr�!b\Q,�d/��|�dE��<����&Tڿ���f����3����?�m*'��0Ǟ�6"�>��G����>X��&)�*P��N
86�|�N�iӘ�8�I��ʭ�y���lYOf)$��T�U�f�B_s�'���>�F~�q��]u�J+K�wE���Q��q�z�+n�VH7
�A���m��լ���(�G� ���.	V���O�Zׇ�������7��BJ�w��mɡ\�fǔI	� ������ڧh�V�X�����g��R�i!��[��5z�ݤ��ZMN�U�zٚfű��7=�N�F�d%���*}�z�Q�J���t��?�4�o��3��F4'�{��]�����D+��RiAԂ�����EԘ�B_ڇ�C��K����!vU�/ܺ�6���ԣ�B�2�R�˱��!�U��c�*q|��Y��[m�
�[g6���F�9�`<�`<�����Iͳ��K�Z�f:��ڟ�)�;��� dY��@�     