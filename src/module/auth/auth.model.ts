import { model, Schema } from "mongoose";
import { IFCMToken, INotificationSettings, IOtp, ISignUpBase, Role } from './auth.interface';
import MongooseHelper from "../../utility/mongoose.helpers";


// ========================
// FCM TOKEN SUB SCHEMA
// ========================

const FCMTokenSchema = new Schema<IFCMToken>(
  {
    token: { type: String, required: true },
    device: { type: String, enum: ["ios", "android", "web"], required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


// ========================
// NOTIFICATION SETTINGS
// ========================

const NotificationSettingsSchema = new Schema<INotificationSettings>(
  {
    pushEnabled: { type: Boolean, default: true },
    emailEnabled: { type: Boolean, default: true },
    orderUpdates: { type: Boolean, default: true },
    promotions: { type: Boolean, default: true },
    rewards: { type: Boolean, default: true },
    withdrawals: { type: Boolean, default: true },
  },
  { _id: false }
);


// ========================
// MAIN SIGNUP SCHEMA
// ========================

export const SignupSchema = new Schema<ISignUpBase>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // do not return by default
    },

    role: {
      type: String,
      enum: Role,
      default: "User",
      required: true,
    },

    firstName: {
      type: String,
      required: function () {
        return this.role === "User";
      },
    },

    lastName: {
      type: String,
      required: function () {
        return this.role === "User";
      },
    },

    userName: { type: String, default: "" },

    profile: { type: [String], default: [] },

    coverPhoto: { type: [String], default: [] },

    mobile: { type: String, required: true },

    countryCode: { type: String, required: true },

    stripe_customer_id: {
      type: String,
      required: function () {
        return this.role !== "Admin";
      },
    },

    passwordUpdatedAt: {
      type: Date,
      default: Date.now,
    },

    last_login: {
      type: Date,
      default: Date.now,
    },

    failed_attempts: {
      type: Number,
      default: 0,
    },

    fcm: {
      type: String,
      default: "",
    },

    fcmTokens: {
      type: [FCMTokenSchema],
      default: [],
    },

    notificationSettings: {
      type: NotificationSettingsSchema,
      default: () => ({}),
    },

    isMailVerified: {
      type: Boolean,
      default: false,
    },

    agreeTcp: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OtpSchema = new Schema<IOtp>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [false, "User ID is not required"],
    },
    email: {
      type: String,
      required: [true, "Email is Not Required"],
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "0" },
    },
  },
  { timestamps: true }
);

MongooseHelper.applyToJSONTransform(OtpSchema);

const Otp = model<IOtp>("Otp", OtpSchema);
export default Otp;
