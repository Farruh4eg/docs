export const load = async () => {
	let data = `\n\n\nСИШАРП ДЕКСТОП 

MainForm.cs



using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TipCalculatorDesc
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            InitializeRoundingOptions();
        }
        private void InitializeRoundingOptions()
        {
            cmbRounding.Items.Add("В большую сторону");
            cmbRounding.Items.Add("В меньшую сторону");
            cmbRounding.SelectedIndex = 0; 
        }

        private void trackBarTipPercentage_Scroll(object sender, EventArgs e)
        {
            txtCustomTip.Text = string.Empty; 
            lblTipAmount.Text = $"{trackBarTipPercentage.Value}%"; 
        }

      
        private decimal CalculateTip(decimal amount, int percentage)
        {
            return amount * (percentage / 100m);
        }

        private void btnPreset_Click(object sender, EventArgs e)
        {
            if (sender is Button button)
            {
                if (int.TryParse(button.Tag.ToString(), out int presetTip))
                {
                    trackBarTipPercentage.Value = presetTip; 
                    lblTipAmount.Text = $"{presetTip}%"; 
                    txtCustomTip.Text = string.Empty; 
                }
            }
        }

        private void btnCalculate_Click(object sender, EventArgs e)
        {
            if (decimal.TryParse(txtBillAmount.Text, out decimal billAmount) &&
                int.TryParse(txtPeopleCount.Text, out int peopleCount))
            {
                int tipPercentage = trackBarTipPercentage.Value;

                if (int.TryParse(txtCustomTip.Text, out int customTip) && customTip > 0)
                {
                    tipPercentage = customTip; 
                }

                decimal tipAmount = CalculateTip(billAmount, tipPercentage);
                decimal totalAmount = billAmount + tipAmount;
                decimal individualShare = peopleCount > 0 ? totalAmount / peopleCount : totalAmount;

                if (cmbRounding.SelectedItem != null)
                {
                    string roundingMethod = cmbRounding.SelectedItem.ToString();
                    totalAmount = roundingMethod == "В большую сторону" ? Math.Ceiling(totalAmount) : Math.Floor(totalAmount);
                    individualShare = roundingMethod == "В большую сторону" ? Math.Ceiling(individualShare) : Math.Floor(individualShare);
                }

                lblTipAmount.Text = $"Чаевые: {tipAmount:C}";
                lblTotalAmount.Text = $"Общая сумма: {totalAmount:C}";
                lblIndividualShare.Text = $"Индивидуальная доля: {individualShare:C}";
            }
            else
            {
                MessageBox.Show("Пожалуйста, введите корректные данные.", "Ошибка", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}

MAINPAGE.XAML 

<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="TipСalculator.MainPage">

    <ScrollView>
        <VerticalStackLayout
        Padding="30,0"
        Spacing="25">


            <Label Text="Введите сумму счета:" />
            <Entry x:Name="BillAmountEntry" Keyboard="Numeric" Placeholder="Сумма" />

            <Label Text="Выберите процент чаевых:" />
            <Slider x:Name="TipPercentageSlider" Minimum="0" Maximum="25" ValueChanged="TipPercentageSlider_ValueChanged" />
            <Label x:Name="TipPercentageLabel" Text="0%" />

            <Label Text="Или введите процент вручную:" />
            <Entry x:Name="CustomTipEntry" Keyboard="Numeric" Placeholder="Процент" TextChanged="CustomTipEntry_TextChanged" />

            <Label Text="Введите количество человек:" />
            <Entry x:Name="PeopleCountEntry" Keyboard="Numeric" Placeholder="Количество" />

            <Label Text="Выберите способ округления:" />
            <Picker x:Name="RoundingPicker">
                <Picker.ItemsSource>
                    <x:Array Type="{x:Type x:String}">
                        <x:String>В большую сторону</x:String>
                        <x:String>В меньшую сторону</x:String>
                    </x:Array>
                </Picker.ItemsSource>
            </Picker>

            <Button Text="Рассчитать" Clicked="CalculateButton_Clicked" />

            <Label x:Name="TipAmountLabel" FontSize="Medium" />
            <Label x:Name="TotalAmountLabel" FontSize="Medium" />
            <Label x:Name="IndividualShareLabel" FontSize="Medium" />
        </VerticalStackLayout>
    </ScrollView>


</ContentPage>

MAINPAGE.XAML.CS

namespace TipСalculator
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void TipPercentageSlider_ValueChanged(object sender, ValueChangedEventArgs e)
        {
            TipPercentageLabel.Text = $"{(int)e.NewValue}%";
            CustomTipEntry.Text = string.Empty; // Очистить ручной ввод
        }

        private void CustomTipEntry_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (int.TryParse(e.NewTextValue, out int customTip))
            {
                TipPercentageSlider.Value = customTip; // Обновить слайдер
            }
        }

        private void CalculateButton_Clicked(object sender, EventArgs e)
        {
            if (decimal.TryParse(BillAmountEntry.Text, out decimal billAmount) &&
                int.TryParse(TipPercentageLabel.Text.TrimEnd('%'), out int tipPercentage) &&
                int.TryParse(PeopleCountEntry.Text, out int peopleCount))
            {
                decimal tipAmount = CalculateTip(billAmount, tipPercentage);
                decimal totalAmount = billAmount + tipAmount;
                decimal individualShare = peopleCount > 0 ? totalAmount / peopleCount : totalAmount;

                // Округление
                if (RoundingPicker.SelectedItem != null)
                {
                    string roundingMethod = RoundingPicker.SelectedItem.ToString();
                    totalAmount = roundingMethod == "В большую сторону" ? Math.Ceiling(totalAmount) : Math.Floor(totalAmount);
                    individualShare = roundingMethod == "В большую сторону" ? Math.Ceiling(individualShare) : Math.Floor(individualShare);
                }

                TipAmountLabel.Text = $"Чаевые: {tipAmount:C}";
                TotalAmountLabel.Text = $"Общая сумма: {totalAmount:C}";
                IndividualShareLabel.Text = $"Индивидуальная доля: {individualShare:C}";
            }
        }

        private decimal CalculateTip(decimal amount, int percentage)
        {
            return amount * (percentage / 100m);
        }
    }

}


\n\n\n\n\n\n\n\n\n`;

	return { data };
};
