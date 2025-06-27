INSERT INTO permissions (permission_name) VALUES
                                              ('CREATE'),
                                              ('READ'),
                                              ('UPDATE'),
                                              ('DELETE')
    ON CONFLICT (permission_name) DO NOTHING;

INSERT INTO roles (role_name) VALUES
                                  ('ADMIN'),
                                  ('CHEF'),
                                  ('WAITER'),
                                  ('USER')
    ON CONFLICT (role_name) DO NOTHING;