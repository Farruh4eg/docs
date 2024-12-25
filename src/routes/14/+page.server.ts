export const load = async() => {
  let data = `\n\n\nMAINPAGE.XAML 
         
          <?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="resheto.MainPage">

    <ScrollView>
        <VerticalStackLayout
            Padding="30,0"
            Spacing="25">
            <Label Text="Введите число n:"/>
            <Entry x:Name="Num" Placeholder="Введите число здесь..." Keyboard="Numeric"/>
            <Button x:Name="Start" Text="Enter" Clicked="Start_Clicked"/>
            <Grid x:Name="ResultResh" Grid.Row="1" ColumnSpacing="10" RowSpacing="10" Padding="10"/>
            <Button x:Name="Next" Text="Следующая итерация" Clicked="Button_Clicked"
            IsVisible="{OnPlatform
                            x:Boolean,
                            Android=false,
                            WinUI=true}"/>
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>

	MAINPAGE.XAML.CS

using System.Collections.Generic;

namespace resheto
{
    public partial class MainPage : ContentPage
    {
        int count = 0;
        public string res = "";
        public MainPage()
        {
            InitializeComponent();
        }

        private void Start_Clicked(object sender, EventArgs e)
        {
            if (int.TryParse(Num.Text, out int limit))
            {
                Resheto(limit);
                count = limit;
            }
            else
            {
                ResultResh.Clear();
                Label error = new Label { Text = "Invalid input" };
                ResultResh.Add(error);
                res = error.Text;
            }
        }

        public void Resheto(int limit)
        {
            ResultResh.Clear();
            if (limit < 2)
            {
                Label error = new Label { Text = "Limit must be greater than 1" };
                ResultResh.Add(error);
                res = error.Text;
                return;
            }


            bool[] isPrime = new bool[limit + 1];
            for (int i = 2; i <= limit; i++)
            {
                isPrime[i] = true;
            }

            for (int p = 2; p * p <= limit; p++)
            {
                if (isPrime[p])
                {
                    for (int i = p * p; i <= limit; i += p)
                    {
                        isPrime[i] = false;
                    }
                }
            }
            int col = 0;
            int row = 0;
            for (int i = 2; i <= limit; i++)
            {
                if (isPrime[i])
                {
                    Label primeLabel = new Label { Text = i.ToString() };
                    ResultResh.Add(primeLabel, col, row);
                    res = primeLabel.Text;
                    col++;
                    if (col > 5)
                    {
                        col = 0;
                        row++;
                    }

                }
            }
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            if (count != 0)
            {
                count++;
                Resheto(count);
                Num.Text = count.ToString();
            } else
            {
                ResultResh.Clear();
                Label error = new Label { Text = "Invalid input" };
                ResultResh.Add(error);
            }
        }
    }

}
DECSTOP   
	
	using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace SieveOfEratosthenesAppWinForms
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        // Обработчик нажатия кнопки "Сформировать решето"
        private void generateButton_Click(object sender, EventArgs e)
        {
            if (!int.TryParse(numberTextBox.Text, out int number) || number < 2)
            {
                MessageBox.Show("Введите число больше 1.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var primes = GenerateSieve(number);
            resultLabel.Text = string.Join(", ", primes);
        }

        // Метод для генерации решета Эратосфена
        private List<int> GenerateSieve(int number)
        {
            var isPrime = new bool[number + 1];
            for (int i = 2; i <= number; i++)
            {
                isPrime[i] = true;
            }

            for (int p = 2; p * p <= number; p++)
            {
                if (isPrime[p])
                {
                    for (int i = p * p; i <= number; i += p)
                    {
                        isPrime[i] = false;
                    }
                }
            }

            var primes = new List<int>();
            for (int i = 2; i <= number; i++)
            {
                if (isPrime[i])
                {
                    primes.Add(i);
                }
            }

            return primes;
        }
    }
}

Как запустить:
1.Для MAUI:
oСоздайте новый проект MAUI в Visual Studio.
oЗамените содержимое файлов MainPage.xaml и MainPage.xaml.cs на приведенный выше код.
oЗапустите приложение.
2.Для Windows Forms:
oСоздайте новый проект Windows Forms в Visual Studio.
oДобавьте элементы управления (TextBox, Button, Label) на форму.
oЗамените код на приведенный выше.
oЗапустите приложение.


\n\n\n\n\n\n\n\n\n`

return {data};
}