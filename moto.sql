PGDMP                          z            moto    14.1    14.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16395    moto    DATABASE     `   CREATE DATABASE moto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE moto;
                postgres    false            �            1259    16452    fcms    TABLE     �   CREATE TABLE public.fcms (
    id integer NOT NULL,
    token character varying,
    "updatedAt" time with time zone,
    "createdAt" time with time zone
);
    DROP TABLE public.fcms;
       public         heap    postgres    false            �            1259    16455 
   fcm_id_seq    SEQUENCE     �   ALTER TABLE public.fcms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fcm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16405    todos    TABLE     �  CREATE TABLE public.todos (
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
    "whoDone" character varying,
    "whoAdd" character varying
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
            public          postgres    false    213            �            1259    16414    users    TABLE     v  CREATE TABLE public.users (
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
            public          postgres    false    215            �          0    16452    fcms 
   TABLE DATA           C   COPY public.fcms (id, token, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    217   b       �          0    16405    todos 
   TABLE DATA           �   COPY public.todos (id, part, indexx, quantity, price, band_number, note, collect_date, "createdAt", "updatedAt", company, condition, done, "whoDone", "whoAdd") FROM stdin;
    public          postgres    false    213          �          0    16414    users 
   TABLE DATA           �   COPY public.users (id, firstname, lastname, username, "isAdmin", "isEditor", "isViewer", "accessToken", "refreshToken", password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �                  0    0 
   fcm_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.fcm_id_seq', 1, true);
          public          postgres    false    218                       0    0    todo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.todo_id_seq', 156, true);
          public          postgres    false    214                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 28, true);
          public          postgres    false    216            �   �   x��QB0  �g���1�7��w��][��K�����t�쉱�&��`�L�.���Զ ��eݨ?��,����x�!B�Q�mx�sX��}T�?�p����yyO�c��i���8)�Q��W�P�6�:��l�2�T�d
2|~g��Y�H)��$�r��e��7�      �   Z  x��Y�R#7}_1yEj��f ��R�+��}�֙`oٸ(����T^���f����g�(��5�H�>}�ᒑ���vL8�����`��=�mƹ��KF��%��ԔKC��O㯓���'r�O����ݗ�?v��r2�����0'  �Pj�!���v�Q.�փ�
(h�a(Ǘ��q��C��wM��S>�x�|�o�mVd �p^ʸY�� δ�jk��q���T�|t%(�*��1��n�D������8�HCwۣ+M��Qt!!]�mх�.\�$������Qp�Y���ЕQt*�ir]L�/!��DGJY2���g��l>�=��j,�>�^9��k�+/$��{��kdN�Qv>~�<��8e:�(	J'��ZU^��� ~�<|+��}�=�v��3�<HTC^���l��H�'	�����jTjd$��Q���e�a������/�i�)oő|-��wEU�>�����Y1�<��t�r[���PPcS��+E�(S�?�䷣B����3f�y8�90TCR�sޕ�T�H�KA&U9�8X/5�F9��At��B��Q�)I� �r��:v�J���+Ũ��^�`�
?ם(�څ���.���m��A���1�(@R����AU��`���u� X���RP���J�	XZ�,Q8����n*	�3<��>)͐B7�D
���%G6͛u�
t�!(1�-�4w*;�2-6�2��Bu@l� �.\�"�[��fP{���G�eZ�d�Ԉ���P�	�8���������@�*V~�-�=��a6��\m0�tr�C(xn����<^�	Uڷ���`4�`;0�?\�QB��\��,�%�%0��. B���q:=��Q7�f�����m���kRT�2N>Gyv9��Ӣ�"����zO~Ir��5����Lz�1��҃�r8c�ĖA4�{8p����r�l4%��Ql�����XN��~e4W�z&$���׬�KF%Fn��q8�	�����l���K�: ��aS앱C?��k7�a$WVc�c��H��ĩt �����*<��-6���~0��E�~���9W�"Q�b�]i����+�Ԡ���W�$�0�����PaT�dQ`E��Zr<��%��(�,T�6��S�h��͐%��Q����˓�����9|��\���@6^����d�����$��L(E��"9���~j����1pM���C��ϛ	p#Q������Y	�R����c%\�!��m��`����*C0����|=Yc���M�j���}���U���^:�DŲ�0/��]�Ϗ�ι�"�aH��]��4�7�]�&��Ѥ��O�뽳��^L'>ѝ���K�S�      �     x����r�@�3>G��0B�#QQ�*��������mn�kI��[[�=���U������=g세Mg�&yߎܕ{�o�v&>,���L��fFm��όG�T�?3U~8c�w����Ξ5Y@2>콷��e:C��8
VJ�?�p��������=�����gt���p�d;vS��
�(����=��ЦeC��D�AEZx�4lq��ꙵ����9|7�ldzҪ�Ϭѝ��[����� �XǢ�{�L�1��"��q�/����9�K�zfVa���|�ܘXn�ۮ6h�R���������l����ҥ>�;�� J��%�֍8 i�������b���B��וm-7^�*z�e,v0.�U��v�x:�O��L�+�CX��Ȝ�.qƸ��sů������'�k�9�'Щ����'�b�-�]�V>S����{S��C��k�\�^Ua�WS7� j���UP��k������z��MN��pԚ��X+��F��^�     