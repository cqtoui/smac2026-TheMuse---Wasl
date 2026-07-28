// @ts-nocheck

import { supabase } from "@/api/supabaseClient";

const DB_PREFIX = "wasl_db_";

const nowIso = () => new Date().toISOString();

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const read = (name) => {
  try {
    const storedValue = localStorage.getItem(
      `${DB_PREFIX}${name}`
    );

    return storedValue
      ? JSON.parse(storedValue)
      : [];
  } catch (error) {
    console.error(
      `Unable to read local ${name} data:`,
      error
    );

    return [];
  }
};

const write = (name, rows) => {
  localStorage.setItem(
    `${DB_PREFIX}${name}`,
    JSON.stringify(rows)
  );
};

const matches = (row, query = {}) =>
  Object.entries(query).every(
    ([key, value]) => row[key] === value
  );

const entity = (name) => ({
  async list(
    sort = "-created_date",
    limit = 100
  ) {
    const rows = [...read(name)];

    const descending =
      sort.startsWith("-");

    const key =
      sort.replace(/^-/, "");

    rows.sort(
      (firstRow, secondRow) => {
        const firstValue = String(
          firstRow[key] ?? ""
        );

        const secondValue = String(
          secondRow[key] ?? ""
        );

        const comparison =
          firstValue.localeCompare(
            secondValue
          );

        return descending
          ? comparison * -1
          : comparison;
      }
    );

    return rows.slice(0, limit);
  },

  async filter(query = {}) {
    return read(name).filter((row) =>
      matches(row, query)
    );
  },

  async get(id) {
    const row = read(name).find(
      (item) => item.id === id
    );

    if (!row) {
      throw new Error(
        `${name} not found.`
      );
    }

    return row;
  },

  async create(data) {
    const rows = read(name);

    const row = {
      id: makeId(),
      created_date: nowIso(),
      updated_date: nowIso(),
      ...data,
    };

    rows.push(row);

    write(name, rows);

    return row;
  },

  async update(id, patch) {
    const rows = read(name);

    const index = rows.findIndex(
      (item) => item.id === id
    );

    if (index < 0) {
      throw new Error(
        `${name} not found.`
      );
    }

    rows[index] = {
      ...rows[index],
      ...patch,
      updated_date: nowIso(),
    };

    write(name, rows);

    return rows[index];
  },

  async delete(id) {
    const remainingRows =
      read(name).filter(
        (item) => item.id !== id
      );

    write(name, remainingRows);

    return {
      success: true,
    };
  },

  async deleteMany(query = {}) {
    const remainingRows =
      read(name).filter(
        (item) =>
          !matches(item, query)
      );

    write(name, remainingRows);

    return {
      success: true,
    };
  },
});

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  const metadata =
    user.user_metadata || {};

  return {
    id: user.id,
    email: user.email || "",

    full_name:
      metadata.full_name ||
      metadata.name ||
      "",

    avatar_url:
      metadata.avatar_url ||
      metadata.picture ||
      null,

    language:
      metadata.language || "en",

    role:
      metadata.role || "user",

    email_confirmed_at:
      user.email_confirmed_at ||
      null,

    created_at:
      user.created_at || null,

    updated_at:
      user.updated_at || null,

    metadata,
    raw: user,
  };
};

const buildRedirectUrl = (
  path = "/"
) => {
  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return new URL(
    normalizedPath,
    window.location.origin
  ).toString();
};

const auth = {
  async me() {
    const {
      data: { user },
      error,
    } =
      await supabase.auth.getUser();

    if (error) {
      const message =
        error.message?.toLowerCase() ||
        "";

      if (
        message.includes(
          "auth session missing"
        ) ||
        message.includes(
          "session"
        )
      ) {
        return null;
      }

      throw error;
    }

    return normalizeUser(user);
  },

  async getSession() {
    const {
      data: { session },
      error,
    } =
      await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  },

  async register({
    email,
    password,
    fullName = "",
    language = "en",
  }) {
    const normalizedEmail =
      email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error(
        "Please enter your email address."
      );
    }

    if (!password) {
      throw new Error(
        "Please enter a password."
      );
    }

    if (password.length < 6) {
      throw new Error(
        "Your password must contain at least 6 characters."
      );
    }

    const { data, error } =
      await supabase.auth.signUp({
        email: normalizedEmail,
        password,

        options: {
          emailRedirectTo:
            buildRedirectUrl(
              "/login"
            ),

          data: {
            full_name:
              fullName.trim(),

            language,
            role: "user",
          },
        },
      });

    if (error) {
      throw error;
    }

    return {
      user:
        normalizeUser(data.user),

      session:
        data.session,
    };
  },

  async loginViaEmailPassword(
    email,
    password
  ) {
    const normalizedEmail =
      email?.trim().toLowerCase();

    if (
      !normalizedEmail ||
      !password
    ) {
      throw new Error(
        "Please enter your email and password."
      );
    }

    const { data, error } =
      await supabase.auth.signInWithPassword(
        {
          email:
            normalizedEmail,

          password,
        }
      );

    if (error) {
      throw error;
    }

    return {
      user:
        normalizeUser(data.user),

      session:
        data.session,
    };
  },

  async loginWithProvider(
    provider,
    redirectPath = "/"
  ) {
    const supportedProviders = [
      "google",
      "facebook",
    ];

    if (
      !supportedProviders.includes(
        provider
      )
    ) {
      throw new Error(
        `Unsupported sign-in provider: ${provider}`
      );
    }

    const options = {
      redirectTo:
        buildRedirectUrl(
          redirectPath
        ),
    };

    if (
      provider === "google"
    ) {
      options.queryParams = {
        access_type: "offline",
        prompt: "select_account",
      };
    }

    const { data, error } =
      await supabase.auth.signInWithOAuth(
        {
          provider,
          options,
        }
      );

    if (error) {
      throw error;
    }

    return data;
  },

  async updateMe(
    patch = {}
  ) {
    const currentUser =
      await this.me();

    if (!currentUser) {
      throw new Error(
        "You must be signed in to update your account."
      );
    }

    const metadata = {
      ...currentUser.metadata,
      ...patch,
    };

    delete metadata.id;
    delete metadata.email;
    delete metadata.raw;
    delete metadata.metadata;
    delete metadata.created_at;
    delete metadata.updated_at;
    delete metadata.email_confirmed_at;

    const { data, error } =
      await supabase.auth.updateUser({
        data: metadata,
      });

    if (error) {
      throw error;
    }

    return normalizeUser(
      data.user
    );
  },

  async resetPasswordRequest(
    email
  ) {
    const normalizedEmail =
      email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error(
        "Please enter your email address."
      );
    }

    const { data, error } =
      await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo:
            buildRedirectUrl(
              "/reset-password"
            ),
        }
      );

    if (error) {
      throw error;
    }

    return data;
  },

  async resetPassword(
    newPassword
  ) {
    if (!newPassword) {
      throw new Error(
        "Please enter a new password."
      );
    }

    if (
      newPassword.length < 6
    ) {
      throw new Error(
        "Your password must contain at least 6 characters."
      );
    }

    const { data, error } =
      await supabase.auth.updateUser({
        password:
          newPassword,
      });

    if (error) {
      throw error;
    }

    return {
      user:
        normalizeUser(data.user),
    };
  },

  async resendConfirmation(
    email
  ) {
    const normalizedEmail =
      email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error(
        "Please enter your email address."
      );
    }

    const { data, error } =
      await supabase.auth.resend({
        type: "signup",

        email:
          normalizedEmail,

        options: {
          emailRedirectTo:
            buildRedirectUrl(
              "/login"
            ),
        },
      });

    if (error) {
      throw error;
    }

    return data;
  },

  async verifyOtp({
    email,
    token,
    type = "signup",
  }) {
    const normalizedEmail =
      email?.trim().toLowerCase();

    if (
      !normalizedEmail ||
      !token
    ) {
      throw new Error(
        "Email and verification code are required."
      );
    }

    const { data, error } =
      await supabase.auth.verifyOtp({
        email:
          normalizedEmail,

        token,
        type,
      });

    if (error) {
      throw error;
    }

    return {
      user:
        normalizeUser(data.user),

      session:
        data.session,
    };
  },

  async setSession({
    accessToken,
    refreshToken,
  }) {
    if (
      !accessToken ||
      !refreshToken
    ) {
      throw new Error(
        "Access token and refresh token are required."
      );
    }

    const { data, error } =
      await supabase.auth.setSession(
        {
          access_token:
            accessToken,

          refresh_token:
            refreshToken,
        }
      );

    if (error) {
      throw error;
    }

    return data.session;
  },

  async logout(
    redirectPath = null
  ) {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    if (redirectPath) {
      window.location.assign(
        buildRedirectUrl(
          redirectPath
        )
      );
    }

    return {
      success: true,
    };
  },

  redirectToLogin() {
    window.location.assign(
      buildRedirectUrl(
        "/login"
      )
    );
  },
};

const fileToDataUrl = (
  file
) =>
  new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () =>
        resolve(
          reader.result
        );

      reader.onerror = () =>
        reject(
          new Error(
            "Unable to read the selected file."
          )
        );

      reader.readAsDataURL(
        file
      );
    }
  );

const integrations = {
  Core: {
    async UploadFile({
      file,
    }) {
      if (!file) {
        throw new Error(
          "No file was selected."
        );
      }

      return {
        file_url:
          await fileToDataUrl(
            file
          ),
      };
    },

    async TranscribeAudio() {
      throw new Error(
        "Server transcription is not configured yet."
      );
    },

    async InvokeLLM() {
      throw new Error(
        "AI analysis is not configured yet."
      );
    },
  },
};

export const waslApi = {
  auth,

  entities: new Proxy(
    {},
    {
      get: (_, name) =>
        entity(
          String(name)
        ),
    }
  ),

  integrations,
};

export default waslApi;