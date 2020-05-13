
    -- <Gitlabio's>
    CREATE TABLE `Loyalty` (
        `id` INT(32) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `description` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    );

    -- <Gitlabio's>
    CREATE TABLE `Marketing` (
    `id` INT(32) NOT NULL AUTO_INCREMENT,
    -- Fk
    `client_id` INT(32) NOT NULL,
    -- Fk
    `loyalty_id` INT(32) NOT NULL,
    -- Fk
    `offer_id` INT(32) NOT NULL,
    -- Fk
    `sale_id` INT(32) NOT NULL,
        PRIMARY KEY (`id`)
    );