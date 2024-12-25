export const load = async () => {
	let data = `\n\n\nДЕКСТОП 

Структура проекта
1.Ввод данных:
oПоле для ввода суммы в копейках.
oВыбор номинала купюр.
2.Расчет остатка:
oКнопка для выполнения перевода.
oОтображение результата (купюры и остаток).
3.История переводов:
oСписок выполненных переводов.


using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp3
{
    public partial class Form1 : Form
    {


        private List<string> history = new List<string>();
        private TextBox coinInput;
        private ComboBox billSelector;
        private Label remainderLabel;
        private ListBox historyListBox;

        public Form1()
        {
            InitializeComponent();
            InitializeComponents();
        }

        private void InitializeComponents()
        {
            // Поле ввода для монет
            coinInput = new TextBox
            {
                Location = new Point(30, 30),
                Width = 100
            };
            this.Controls.Add(coinInput);

            // Комбобокс для номинала купюр
            billSelector = new ComboBox
            {
                Location = new Point(150, 30),
                Width = 100
            };
            billSelector.Items.AddRange(new string[] { "10", "50", "100", "500", "1000" });
            this.Controls.Add(billSelector);

            // Кнопка для перевода
            Button convertButton = new Button
            {
                Text = "Перевод",
                Location = new Point(270, 30),
                Width = 80
            };
            convertButton.Click += ConvertButton_Click;
            this.Controls.Add(convertButton);

            // Label для отображения остатка
            remainderLabel = new Label
            {
                Location = new Point(30, 70),
                Width = 300,
                Text = "Остаток: 0 коп."
            };
            this.Controls.Add(remainderLabel);

            // ListBox для истории переводов
            historyListBox = new ListBox
            {
                Location = new Point(30, 100),
                Width = 320,
                Height = 120
            };
            this.Controls.Add(historyListBox);
        }
        public string CoinInputText
        {
            get => coinInput.Text;
            set => coinInput.Text = value;
        }

        public string SelectedBill
        {
            get => billSelector.SelectedItem?.ToString();
            set => billSelector.SelectedItem = value;
        }

        public string RemainderLabelText => remainderLabel.Text;

        public List<string> History => history;

        // Для хранения сообщений об ошибках
        public string LastErrorMessage { get; private set; }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {

        }
        private void ConvertButton_Click(object sender, EventArgs e)
        {
            LastErrorMessage = string.Empty; // Обнуляем предыдущее сообщение об ошибке
            ConvertMoney(CoinInputText, SelectedBill);
        }

        private void ConvertMoney(string moneyInput, string selectedBill)
        {
            // Разделяем ввод на рубли и копейки
            string[] parts = moneyInput.Split(',');

            if (parts.Length == 2 && int.TryParse(parts[0], out int rubles) && int.TryParse(parts[1], out int kopecks)
                && int.TryParse(selectedBill, out int bill))
            {
                // Преобразуем всю сумму в копейки
                int totalKopecks = rubles * 100 + kopecks;

                int count = 0; // Счетчик выданных купюр

                // Преобразуем купюры в копейки
                int billInKopecks = bill * 100;

                while (totalKopecks >= billInKopecks)
                {
                    totalKopecks -= billInKopecks; // Уменьшаем общее количество копеек на значение купюры
                    count++; // Увеличиваем счетчик
                }

                if (count > 0)
                {
                    // Обновляем остаток
                    remainderLabel.Text = $"Остаток: {totalKopecks / 100} руб. {totalKopecks % 100} коп.";

                    // Добавляем информацию о выданных купюрах в историю
                    string entry = $"Купюра {bill} р. выдана {count} раз(а), остаток: {totalKopecks / 100} руб. {totalKopecks % 100} коп.";
                    history.Add(entry);
                    historyListBox.Items.Add(entry);

                    // Выводим итоговое сообщение
                    MessageBox.Show($"{entry}", "Успех");
                }
                else
                {
                    MessageBox.Show("Недостаточно средств для конвертации.", "Ошибка");
                }
            }
            else
            {
                MessageBox.Show("Пожалуйста, введите корректные значения в формате 'рубли,копейки'.", "Ошибка");
            }

        }
        static class Program
        {
            [STAThread]
            static void Form1()
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new Form1());
            }
        }
    }

}




MAINPAGE.XAML

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="CurrencyExchangeApp.MainPage">

    <VerticalStackLayout Spacing="20" Padding="20">

        <!-- Заголовок -->
        <Label Text="Купюрообменник" FontSize="24" HorizontalOptions="Center" />

        <!-- Поле для ввода суммы -->
        <Entry x:Name="AmountEntry" Placeholder="Введите сумму в копейках" Keyboard="Numeric" />

        <!-- Выбор номинала купюр -->
        <Label Text="Выберите номинал купюр:" />
        <Picker x:Name="DenominationPicker">
            <Picker.Items>
                <x:String>100</x:String>
                <x:String>500</x:String>
                <x:String>1000</x:String>
                <x:String>5000</x:String>
            </Picker.Items>
        </Picker>

        <!-- Кнопка для перевода -->
        <Button Text="Перевести" Clicked="OnConvertClicked" />

        <!-- Результат перевода -->
        <Label x:Name="ResultLabel" FontSize="18" HorizontalOptions="Center" />

    </VerticalStackLayout>

</ContentPage>


MAINPAGE.XAML.CS


using System;
using Microsoft.Maui.Controls;

namespace CurrencyExchangeApp
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        // Обработчик нажатия кнопки "Перевести"
        private void OnConvertClicked(object sender, EventArgs e)
        {
            if (!int.TryParse(AmountEntry.Text, out int amount) || amount < 0)
            {
                DisplayAlert("Ошибка", "Введите корректную сумму.", "OK");
                return;
            }

            if (DenominationPicker.SelectedItem == null)
            {
                DisplayAlert("Ошибка", "Выберите номинал купюр.", "OK");
                return;
            }

            int denomination = int.Parse(DenominationPicker.SelectedItem.ToString());
            int bills = amount / denomination;
            int remainder = amount % denomination;

            ResultLabel.Text = $"Купюр: {bills}, Остаток: {remainder} копеек";
        }
    }
}

\n\n\n\n\n\n\n\n\n`;

	return { data };
};
