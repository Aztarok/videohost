// First, let's create a type for the actual session data
export type SessionData = {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number | undefined;
    refresh_token: string;
    user: {
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        phone: string;
        confirmed_at: string;
        last_sign_in_at: string;
        app_metadata: Record<string, unknown>;
        user_metadata: Record<string, unknown>;
        identities: Array<unknown>;
        created_at: string;
        updated_at: string;
        is_anonymous: boolean;
    };
};

// Then define Session type
export type Session = {
    session: string | undefined;
};

