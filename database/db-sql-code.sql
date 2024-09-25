CREATE TYPE public.account_type AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.account_type
    OWNER TO cse340;

    -- Table structure for table 'classification'
CREATE TABLE public.classification(
classification_id INT GENERATED BY DEFAULT AS IDENTITY,
classification_name CHARACTER VARYING NOT NULL,
CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);