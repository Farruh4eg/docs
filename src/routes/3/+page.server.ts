export const load = async () => {
	let data = `\n\n\nДЕКСТОП СИШАРП

using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace DoctorAppointmentAppWinForms
{
    public partial class MainForm : Form
    {
        private List<string> clinics = new List<string> { "Поликлиника №1", "Поликлиника №2", "Поликлиника №3" };

        public MainForm()
        {
            InitializeComponent();

            // Заполнение списка поликлиник
            clinicComboBox.Items.AddRange(clinics.ToArray());
        }

        // Обработка нажатия кнопки "Далее"
        private void nextButton_Click(object sender, EventArgs e)
        {
            string selectedClinic = clinicComboBox.SelectedItem?.ToString();
            if (string.IsNullOrEmpty(selectedClinic))
            {
                MessageBox.Show("Выберите поликлинику.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var doctorForm = new DoctorSelectionForm(selectedClinic);
            doctorForm.ShowDialog();
        }
    }
}
DoctorSelectionForm.cs
csharp
Copy
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace DoctorAppointmentAppWinForms
{
    public partial class DoctorSelectionForm : Form
    {
        private string selectedClinic;
        private List<string> doctors = new List<string> { "Терапевт", "Хирург", "Офтальмолог", "Кардиолог" };

        public DoctorSelectionForm(string clinic)
        {
            InitializeComponent();
            selectedClinic = clinic;

            // Заполнение списка врачей
            doctorComboBox.Items.AddRange(doctors.ToArray());
        }

        // Обработка нажатия кнопки "Далее"
        private void nextButton_Click(object sender, EventArgs e)
        {
            string selectedDoctor = doctorComboBox.SelectedItem?.ToString();
            if (string.IsNullOrEmpty(selectedDoctor))
            {
                MessageBox.Show("Выберите врача.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var appointmentForm = new AppointmentForm(selectedClinic, selectedDoctor);
            appointmentForm.ShowDialog();
        }
    }
}
AppointmentForm.cs
csharp
Copy
using System;
using System.Windows.Forms;

namespace DoctorAppointmentAppWinForms
{
    public partial class AppointmentForm : Form
    {
        private string selectedClinic;
        private string selectedDoctor;

        public AppointmentForm(string clinic, string doctor)
        {
            InitializeComponent();
            selectedClinic = clinic;
            selectedDoctor = doctor;
        }

        // Обработка нажатия кнопки "Записаться"
        private void bookButton_Click(object sender, EventArgs e)
        {
            string date = datePicker.Value.ToString("dd/MM/yyyy");
            string time = timePicker.Value.ToString("HH:mm");
            string name = nameTextBox.Text;
            string phone = phoneTextBox.Text;

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(phone))
            {
                MessageBox.Show("Заполните все поля.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Вывод подтверждения записи
            MessageBox.Show($"Вы записаны:\nПоликлиника: {selectedClinic}\nВрач: {selectedDoctor}\nДата: {date}\nВремя: {time}\nИмя: {name}\nТелефон: {phone}",
                "Запись подтверждена", MessageBoxButtons.OK, MessageBoxIcon.Information);

            // Закрытие формы
            this.Close();
        }
    }

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
