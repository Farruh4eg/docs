export const load = async() => {
  let data = `\n\n\nMAINFORM.CS
  using System;
using System.Drawing;
using System.Windows.Forms;

namespace eventProApp
{
    public partial class mainForm : Form
    {
        public mainForm()
        {
            InitializeComponent();
        }

        private void contractorsListButton_Click(object sender, EventArgs e)
        {
            contractorsListForm contractorsListForm = new contractorsListForm();

            this.Hide();
            contractorsListForm.ShowDialog();
            this.Show();
        }

        private void contractorsAddButton_Click(object sender, EventArgs e)
        {
            contractorsAddForm contractorsAddForm = new contractorsAddForm();

            this.Hide();
            contractorsAddForm.ShowDialog();
            this.Show();
        }

        private void contractorsEditButton_Click(object sender, EventArgs e)
        {
            contractorsEditForm contractorsEditForm = new contractorsEditForm();

            this.Hide();
            contractorsEditForm.ShowDialog();
            this.Show();
        }

        private void serviceHistoryButton_Click(object sender, EventArgs e)
        {
            serviceHistoryForm serviceHistoryForm = new serviceHistoryForm();

            this.Hide();
            serviceHistoryForm.ShowDialog();
            this.Show();
        }

        private void contractorsListButton_MouseEnter(object sender, EventArgs e)
        {
            contractorsListButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            contractorsListButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void contractorsListButton_MouseLeave(object sender, EventArgs e)
        {
            contractorsListButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            contractorsListButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void contractorsAddButton_MouseEnter(object sender, EventArgs e)
        {
            contractorsAddButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            contractorsAddButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void contractorsAddButton_MouseLeave(object sender, EventArgs e)
        {
            contractorsAddButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            contractorsAddButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void contractorsEditButton_MouseEnter(object sender, EventArgs e)
        {
            contractorsEditButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            contractorsEditButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void contractorsEditButton_MouseLeave(object sender, EventArgs e)
        {
            contractorsEditButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            contractorsEditButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void serviceHistoryButton_MouseEnter(object sender, EventArgs e)
        {
            serviceHistoryButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            serviceHistoryButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void serviceHistoryButton_MouseLeave(object sender, EventArgs e)
        {
            serviceHistoryButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            serviceHistoryButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }
    }
}

\n\n\nELEMENTS.CS
namespace eventProApp
{
    public class elements
    {
        public static string connectionString = "Server=172.20.7.6; Port=5432; UserId=st2996; Password=pwd2996; Database=probnikProbnikaDemExam;";
        public static string contractorsSelect = "SELECT * FROM contractorReliability ORDER BY \"Надежность\" DESC";
        public static string contractorsTypesSelect = "SELECT name FROM contractorTypes ORDER BY name";
        public static string typeIdSelect = "SELECT id FROM contractorTypes WHERE name = @name";
        public static string insertContractor = @"
            INSERT INTO contractors
            VALUES (
                default,
                @typeId, @name, @address, @inn, 
                @lastName, @firstName, @patronymic, 
                @phoneNumber, @email, @rating
            )";
        public static string contractorsNamesSelect = "SELECT name FROM contractors ORDER BY name";
        public static string contractorSelect = @"SELECT c.id, c.name, c.address, c.inn, 
            c.contactLastName, c.contactFirstName, c.contactPatronymic,
            c.phoneNumber, c.email, c.rating,
            ct.name as typeName
            FROM contractors c
            JOIN contractorTypes ct ON c.typeId = ct.id
            WHERE c.name = @name";
        public static string contractorTypeIdSelect = "SELECT id FROM contractorTypes WHERE name = @name";

        public static string contractorUpdate = @"UPDATE contractors 
            SET typeId = @typeId, 
                name = @name, 
                address = @address, 
                inn = @inn, 
                contactLastName = @contactLastName, 
                contactFirstName = @contactFirstName, 
                contactPatronymic = @contactPatronymic, 
                phoneNumber = @phoneNumber, 
                email = @email, 
                rating = @rating
            WHERE id = @id";
        public static string serviceHistorySelect = @"SELECT 
            sh.id AS ""ID записи"",
            s.name AS ""Услуга"",
            c.name AS ""Подрядчик"",
            sh.qualityRating AS ""Качество"",
            sh.timelinessPercentage AS ""Своевременность"",
            sh.completionDate AS ""Дата выполнения""
            FROM serviceHistory sh
            JOIN services s ON sh.serviceId = s.id
            JOIN contractors c ON sh.contractorId = c.id
            ORDER BY sh.id DESC";
    }
}

\n\n\nCONTRACTORSLISTFORM.CS
using System.Data;
using System;
using System.Drawing;
using System.Windows.Forms;
using Npgsql;

namespace eventProApp
{
    public partial class contractorsListForm : Form
    {
        public contractorsListForm()
        {
            InitializeComponent();
            loadContractors();
        }

        private void loadContractors()
        {
            try
            {
                using (var connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    using (var command = new NpgsqlCommand(elements.contractorsSelect, connection))
                    {
                        var adapter = new NpgsqlDataAdapter(command);
                        var dataTable = new DataTable();
                        adapter.Fill(dataTable);

                        contractorsDataGridView.DataSource = dataTable;

                        foreach (DataGridViewColumn column in contractorsDataGridView.Columns)
                        {
                            if (column.Name == "Рейтинг" || column.Name == "Надежность" || column.Name == "ID подрядчика" || column.Name == "ИНН")
                            {
                                column.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                            }
                            else
                            {
                                column.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
                            }
                        }

                        initializeContractorsDataGridView();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при загрузке данных: {ex.Message}", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void mainFormButton_Click(object sender, EventArgs e)
        {
            foreach (Form form in Application.OpenForms)
            {
                if (form is mainForm)
                {
                    form.Show();
                    this.Close();
                    return;
                }
            }

            mainForm mainForm = new mainForm();
            mainForm.Show();
            this.Close();
        }

        private void initializeContractorsDataGridView()
        {
            contractorsDataGridView.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 12, FontStyle.Bold);
            contractorsDataGridView.ColumnHeadersDefaultCellStyle.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            contractorsDataGridView.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
            contractorsDataGridView.AlternatingRowsDefaultCellStyle.BackColor = ColorTranslator.FromHtml("#F4E8D3");
        }

        private void mainMenuButton_MouseEnter(object sender, EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainMenuButton_MouseLeave(object sender, EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }
    }
}

\n\n\nCONTRACTORSEDITFORM.CS
using Npgsql;
using System;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace eventProApp
{
    public partial class contractorsEditForm : Form
    {
        private int currentContractorId = -1;

        public contractorsEditForm()
        {
            InitializeComponent();
            loadContractorsTypes();
            loadContractorsNames();
        }

        private void editButton_Click(object sender, EventArgs e)
        {
            if (currentContractorId == -1)
            {
                MessageBox.Show("Пожалуйста, выберите подрядчика для редактирования");
                return;
            }

            try
            {
                if (!int.TryParse(ratingTextBox.Text, out int rating) || rating < 0 || rating > 5)
                {
                    MessageBox.Show("Рейтинг должен быть целым числом от 0 до 5");
                    return;
                }

                if (innTextBox.Text.Trim().Length != 10 || !innTextBox.Text.Trim().All(char.IsDigit))
                {
                    MessageBox.Show("ИНН должен содержать ровно 10 цифр");
                    return;
                }

                if (phoneNumberTextBox.Text.Trim().Length != 12 || !phoneNumberTextBox.Text.Trim().StartsWith("+") || !phoneNumberTextBox.Text.Trim().Substring(1).All(char.IsDigit))
                {
                    MessageBox.Show("Телефон должен начинаться с + и содержать 12 символов (включая +)");
                    return;
                }

                if (!emailTextBox.Text.Trim().Contains("@"))
                {
                    MessageBox.Show("Введите корректный email");
                    return;
                }

                using (var connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    int typeId = getContractorTypeId(typesComboBox.SelectedItem.ToString());

                    using (var cmd = new NpgsqlCommand(elements.contractorUpdate, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", currentContractorId);
                        cmd.Parameters.AddWithValue("@typeId", typeId);
                        cmd.Parameters.AddWithValue("@name", nameTextBox.Text);
                        cmd.Parameters.AddWithValue("@address", addressTextBox.Text);
                        cmd.Parameters.AddWithValue("@inn", innTextBox.Text);
                        cmd.Parameters.AddWithValue("@contactLastName", lastNameTextBox.Text);
                        cmd.Parameters.AddWithValue("@contactFirstName", firstNameTextBox.Text);
                        cmd.Parameters.AddWithValue("@contactPatronymic", patronymicTextBox.Text);
                        cmd.Parameters.AddWithValue("@phoneNumber", phoneNumberTextBox.Text);
                        cmd.Parameters.AddWithValue("@email", emailTextBox.Text);
                        cmd.Parameters.AddWithValue("@rating", int.Parse(ratingTextBox.Text));

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show("Данные контрагента успешно обновлены");

                loadContractorsNames();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при обновлении данных: {ex.Message}");
            }
        }

        private int getContractorTypeId(string typeName)
        {
            using (var connection = new NpgsqlConnection(elements.connectionString))
            {
                connection.Open();

                using (var cmd = new NpgsqlCommand(elements.contractorTypeIdSelect, connection))
                {
                    cmd.Parameters.AddWithValue("@name", typeName);
                    return Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        private void mainFormButton_Click(object sender, System.EventArgs e)
        {
            foreach (Form form in Application.OpenForms)
            {
                if (form is mainForm)
                {
                    form.Show();
                    this.Close();
                    return;
                }
            }

            mainForm mainForm = new mainForm();
            mainForm.Show();
            this.Close();
        }

        private void loadContractorsTypes()
        {
            try
            {
                using (NpgsqlConnection connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    using (NpgsqlCommand command = new NpgsqlCommand(elements.contractorsTypesSelect, connection))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            typesComboBox.Items.Clear();

                            while (reader.Read())
                            {
                                typesComboBox.Items.Add(reader["name"].ToString());
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при загрузке типов контрагентов: {ex.Message}");
            }
        }

        private void loadContractorsNames()
        {
            contractorsNamesComboBox.Items.Clear();

            using (var connection = new NpgsqlConnection(elements.connectionString))
            {
                connection.Open();

                using (var cmd = new NpgsqlCommand(elements.contractorsNamesSelect, connection))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            contractorsNamesComboBox.Items.Add(reader["name"].ToString());
                        }
                    }
                }
            }
        }

        private void loadContractorData(string contractorName)
        {
            using (var connection = new NpgsqlConnection(elements.connectionString))
            {
                connection.Open();

                using (var cmd = new NpgsqlCommand(elements.contractorSelect, connection))
                {
                    cmd.Parameters.AddWithValue("@name", contractorName);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            currentContractorId = Convert.ToInt32(reader["id"]);
                            nameTextBox.Text = reader["name"].ToString();
                            addressTextBox.Text = reader["address"].ToString();
                            innTextBox.Text = reader["inn"].ToString();
                            lastNameTextBox.Text = reader["contactLastName"].ToString();
                            firstNameTextBox.Text = reader["contactFirstName"].ToString();
                            patronymicTextBox.Text = reader["contactPatronymic"].ToString();
                            phoneNumberTextBox.Text = reader["phoneNumber"].ToString();
                            emailTextBox.Text = reader["email"].ToString();
                            ratingTextBox.Text = reader["rating"].ToString();

                            string typeName = reader["typeName"].ToString();
                            typesComboBox.SelectedItem = typeName;
                        }
                    }
                }
            }
        }

        private void contractorsNamesComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (contractorsNamesComboBox.SelectedItem == null) return;

            string selectedContractorName = contractorsNamesComboBox.SelectedItem.ToString();
            loadContractorData(selectedContractorName);
        }

        private void editButton_MouseEnter(object sender, System.EventArgs e)
        {
            editButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            editButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void editButton_MouseLeave(object sender, System.EventArgs e)
        {
            editButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            editButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainFormButton_MouseEnter(object sender, System.EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainFormButton_MouseLeave(object sender, System.EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }
    }
}

\n\n\nCONTRACTORSADDFORM.CS
using Npgsql;
using System;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace eventProApp
{
    public partial class contractorsAddForm : Form
    {
        public contractorsAddForm()
        {
            InitializeComponent();
            loadContractorsTypes();
        }

        private void addButton_Click(object sender, EventArgs e)
        {
            try
            {
                if (!int.TryParse(ratingTextBox.Text, out int rating) || rating < 0 || rating > 5)
                {
                    MessageBox.Show("Рейтинг должен быть целым числом от 0 до 5");
                    return;
                }

                if (innTextBox.Text.Trim().Length != 10 || !innTextBox.Text.Trim().All(char.IsDigit))
                {
                    MessageBox.Show("ИНН должен содержать ровно 10 цифр");
                    return;
                }

                if (phoneNumberTextBox.Text.Trim().Length != 12 || !phoneNumberTextBox.Text.Trim().StartsWith("+") || !phoneNumberTextBox.Text.Trim().Substring(1).All(char.IsDigit))
                {
                    MessageBox.Show("Телефон должен начинаться с + и содержать 12 символов (включая +)");
                    return;
                }

                if (!emailTextBox.Text.Trim().Contains("@"))
                {
                    MessageBox.Show("Введите корректный email");
                    return;
                }

                using (NpgsqlConnection connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    string selectedTypeName = typesComboBox.SelectedItem.ToString();
                    int typeId;

                    using (NpgsqlCommand getTypeIdCommand = new NpgsqlCommand(elements.typeIdSelect, connection))
                    {
                        getTypeIdCommand.Parameters.AddWithValue("@name", selectedTypeName);
                        typeId = Convert.ToInt32(getTypeIdCommand.ExecuteScalar());
                    }

                    using (NpgsqlCommand insertCommand = new NpgsqlCommand(elements.insertContractor, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@typeId", typeId);
                        insertCommand.Parameters.AddWithValue("@name", nameTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@address", addressTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@inn", innTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@lastName", lastNameTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@firstName", firstNameTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@patronymic", patronymicTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@phoneNumber", phoneNumberTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@email", emailTextBox.Text.Trim());
                        insertCommand.Parameters.AddWithValue("@rating", rating);

                        int rowsAffected = insertCommand.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            MessageBox.Show("Подрядчик успешно добавлен в базу данных");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка: {ex.Message}");
            }
        }

        private void mainFormButton_Click(object sender, System.EventArgs e)
        {
            foreach (Form form in Application.OpenForms)
            {
                if (form is mainForm)
                {
                    form.Show();
                    this.Close();
                    return;
                }
            }

            mainForm mainForm = new mainForm();
            mainForm.Show();
            this.Close();
        }

        private void loadContractorsTypes()
        {
            try
            {
                using (NpgsqlConnection connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    using (NpgsqlCommand command = new NpgsqlCommand(elements.contractorsTypesSelect, connection))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            typesComboBox.Items.Clear();

                            while (reader.Read())
                            {
                                typesComboBox.Items.Add(reader["name"].ToString());
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при загрузке типов контрагентов: {ex.Message}");
            }
        }

        private void addButton_MouseEnter(object sender, System.EventArgs e)
        {
            addButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            addButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }

        private void addButton_MouseLeave(object sender, System.EventArgs e)
        {
            addButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            addButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainFormButton_MouseEnter(object sender, System.EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainFormButton_MouseLeave(object sender, System.EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }
    }
}

\n\n\nSERVICEHISTORYFORM.CS
using Npgsql;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace eventProApp
{
    public partial class serviceHistoryForm : Form
    {
        public serviceHistoryForm()
        {
            InitializeComponent();
            loadHistory();
        }

        private void loadHistory()
        {
            try
            {
                using (var connection = new NpgsqlConnection(elements.connectionString))
                {
                    connection.Open();

                    using (var command = new NpgsqlCommand(elements.serviceHistorySelect, connection))
                    {
                        var adapter = new NpgsqlDataAdapter(command);
                        var dataTable = new DataTable();
                        adapter.Fill(dataTable);

                        serviceHistoryDataGridView.DataSource = dataTable;

                        foreach (DataGridViewColumn column in serviceHistoryDataGridView.Columns)
                        {
                            if (column.Name == "ID записи" || column.Name == "Качество" ||
                                column.Name == "Своевременность" || column.Name == "Дата выполнения")
                            {
                                column.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                            }
                            else
                            {
                                column.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
                            }
                        }

                        if (serviceHistoryDataGridView.Columns.Contains("Дата выполнения"))
                        {
                            serviceHistoryDataGridView.Columns["Дата выполнения"].DefaultCellStyle.Format = "dd.MM.yyyy";
                        }
                        if (serviceHistoryDataGridView.Columns.Contains("Качество"))
                        {
                            serviceHistoryDataGridView.Columns["Качество"].DefaultCellStyle.Format = "0.0";
                        }
                        if (serviceHistoryDataGridView.Columns.Contains("Своевременность"))
                        {
                            serviceHistoryDataGridView.Columns["Своевременность"].DefaultCellStyle.Format = "0'%'";
                        }

                        initializeServiceHistoryDataGridView();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при загрузке истории услуг: {ex.Message}", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void mainFormButton_Click(object sender, EventArgs e)
        {
            foreach (Form form in Application.OpenForms)
            {
                if (form is mainForm)
                {
                    form.Show();
                    this.Close();
                    return;
                }
            }

            mainForm mainForm = new mainForm();
            mainForm.Show();
            this.Close();
        }

        private void initializeServiceHistoryDataGridView()
        {
            serviceHistoryDataGridView.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 12, FontStyle.Bold);
            serviceHistoryDataGridView.ColumnHeadersDefaultCellStyle.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            serviceHistoryDataGridView.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
            serviceHistoryDataGridView.AlternatingRowsDefaultCellStyle.BackColor = ColorTranslator.FromHtml("#F4E8D3");
        }

        private void mainMenuButton_MouseEnter(object sender, EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#67BA80");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#FFFFFF");
        }

        private void mainMenuButton_MouseLeave(object sender, EventArgs e)
        {
            mainFormButton.BackColor = ColorTranslator.FromHtml("#F4E8D3");
            mainFormButton.ForeColor = ColorTranslator.FromHtml("#000000");
        }
    }
}


\n\n\n\n\n\n\n\n\n`

return {data};
}