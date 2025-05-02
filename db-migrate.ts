import { pool } from "./db";

async function createContactTable() {
  try {
    console.log('Creating contact_messages table via SQL...');
    await pool.query(
      
    );
    console.log('Contact messages table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
  
  console.log('Done!');
  process.exit(0);
}

createContactTable();
