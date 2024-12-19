import bcrypt from "bcryptjs";

module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role',
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

    const User = mongoose.model('user', userSchema);

    const createAdminUser = async () => {
        try {
            const Role = mongoose.model('role');
            const adminRole = await Role.findOne({ roleName: 'Admin' });

            if (!adminRole) {
                console.log('Admin role not found. Please create a role with the name "Admin" first.');
                return;
            }

            const adminExists = await User.findOne({ email: 'admin@example.com' });
            if (!adminExists) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash('admin123',salt); 
                await User.create({
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'admin@example.com',
                    phoneNumber: '1234567890',
                    role: adminRole._id,
                    password: hashedPassword,
                });
                console.log('Admin user created successfully.');
            } else {
                console.log('Admin user already exists.');
            }
        } catch (error) {
            console.error('Error creating admin user:', error);
        }
    };

    createAdminUser();

    return User;
};
